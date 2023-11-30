import styled from "@emotion/styled";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "notistack";
import React from "react";
import { useAuth } from "../auth/AuthProvider";
import MuiTextFeild from "../components/MuiTextFeild";
import {
  checkPhoneExists,
  checkStaffEmail,
  login,
  register,
  staffLogin,
} from "../services/AuthService";
import { useLocation } from "react-router-dom";

const Wrapper = styled(Container)`
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledInput = styled(MuiTextFeild)`
  div {
    border-radius: 1rem;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  input {
    font-size: 14px;
    height: 100%;
  }
`;

function Login(props) {
  const { setToken } = useAuth();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = React.useState(1); // 1: Nhập số điện thoại, 2: Nhập mã OTP
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState(""); // Chỉ dùng khi step = 2 && phoneExist = false
  const [gender, setGender] = React.useState(0); // Chỉ dùng khi step = 2 && phoneExist = false | 0: Nam, 1: Nữ
  const [dateOfBirth, setDateOfBirth] = React.useState(""); // Chỉ dùng khi step = 2 && phoneExist = false | yyyy-mm-dd
  const [phoneExist, setPhoneExist] = React.useState(false); // true: Số điện thoại đã tồn tại, false: Số điện thoại chưa tồn tại
  const [otp, setOtp] = React.useState("");

  const handleEnterPhoneNumber = async () => {
    const phoneRegex = /^\d+$/;
    const isStaffEmail = phone
      .trim()
      .toLowerCase()
      .endsWith("@minhtunguyen.onmicrosoft.com");

    if (!phoneRegex.test(phone) && !isStaffEmail) {
      enqueueSnackbar("Vui lòng chỉ nhập số", { variant: "error" });
      return;
    }

    if ((phone.trim().length !== 10 || phone[0] !== "0") && !isStaffEmail) {
      enqueueSnackbar("Số điện thoại không hợp lệ", { variant: "error" });
      return;
    }

    const phoneNumber = isStaffEmail
      ? phone.trim().toLowerCase()
      : "+84" + phone.slice(1);

    enqueueSnackbar(`Đang gửi mã OTP đến ${phone}`, { variant: "info" });
    const response = isStaffEmail
      ? await checkStaffEmail(phoneNumber)
      : await checkPhoneExists(phoneNumber);

    if (response.success) {
      setPhoneExist(response.data.data);
      setStep(2);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
    }
  };

  const handleLogin = async () => {
    const phoneNumber = "+84" + phone.slice(1);
    const isStaffEmail = phone
      .trim()
      .toLowerCase()
      .endsWith("@minhtunguyen.onmicrosoft.com");

    var response;
    if (phoneExist) {
      response = isStaffEmail
        ? await staffLogin(phone.trim().toLowerCase(), otp)
        : await login(phoneNumber, otp);
    } else {
      response = await register(
        phoneNumber,
        name,
        dateOfBirth,
        parseInt(gender),
        otp
      );
    }
    if (!response.success) {
      enqueueSnackbar("OTP không hợp lệ", { variant: "error" });
    } else {
      setToken(response.data.data);
      enqueueSnackbar("Đăng nhập thành công", { variant: "success" });
      if (state?.from) window.location.href = state.from;
      else window.location.href = "/profile";
    }
  };

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} justifyContent={"center"} display={"flex"}>
          <img
            src={
              "https://res.cloudinary.com/dccypeoxt/image/upload/v1698742461/%C4%91%E1%BB%95i_c%E1%BB%A1_thi%E1%BA%BFt_k%E1%BA%BF_cho_ph%C3%B9_h%E1%BB%A3p_v%E1%BB%9Bi_%E1%BA%A3nh_%C4%90%E1%BB%83_ph%C3%B9_h%E1%BB%A3p_v%E1%BB%9Bi_%E1%BA%A3nh_b%E1%BA%A1n_c%C3%B3_th%E1%BB%83_thay_%C4%91%E1%BB%95i_c%E1%BB%A1_thi%E1%BA%BFt_k%E1%BA%BF._feafzn.png"
            }
            alt="Login"
            width={"60%"}
            style={{ maxHeight: "15rem" }}
          />
        </Grid>
        <Grid item xs={12} md={6} alignItems={"center"} display={"flex"}>
          <Paper
            style={{
              width: "80%",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
            }}
            elevation={3}
          >
            <Typography variant="h3" align="center">
              Đăng nhập
            </Typography>
            {step === 1 && (
              <>
                <StyledInput
                  label="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  error={
                    (phone.length > 0 && phone.length < 10) ||
                    phone.length >= 11
                  }
                  style={{ with: "100%" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEnterPhoneNumber();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="color2"
                  size="large"
                  sx={{
                    color: "white",
                    borderRadius: "1rem",
                  }}
                  onClick={handleEnterPhoneNumber}
                >
                  Tiếp tục
                </Button>
              </>
            )}

            {step === 2 && (
              <Stack spacing={3}>
                {!phoneExist && (
                  <>
                    <FormControl>
                      <FormLabel>
                        <Typography style={{ fontSize: "14px" }}>
                          Giới tính
                        </Typography>
                      </FormLabel>
                      <RadioGroup
                        row
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label={
                            <Typography style={{ fontSize: "14px" }}>
                              Nam
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label={
                            <Typography style={{ fontSize: "14px" }}>
                              Nữ
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                    <MuiTextFeild
                      label="Họ và tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StyledDatePicker
                        label="Ngày sinh"
                        value={dateOfBirth}
                        format="DD/MM/YYYY"
                        onChange={(newValue) => {
                          setDateOfBirth(newValue);
                        }}
                        slotProps={{ textField: { size: "medium" } }}
                      />
                    </LocalizationProvider>
                  </>
                )}

                <MuiTextFeild
                  label="Mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="color2"
                  size="large"
                  sx={{
                    color: "white",
                    borderRadius: "1rem",
                  }}
                  onClick={handleLogin}
                >
                  Đăng nhập
                </Button>
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Login;
