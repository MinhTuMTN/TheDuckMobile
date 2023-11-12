import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import AtStoreDeliver from "../components/AtStoreDeliver";
import FormatCurrency from "../components/FormatCurrency";
import ListCustomerAddress from "../components/ListCustomerAddress";
import MuiTextFeild from "../components/MuiTextFeild";
import NewCustomerInfomation from "../components/NewCustomerInfomation";
import ProductInformation from "../components/ProductInformation";
import Unit from "../components/Unit";
import UseCoupon from "../components/UseCoupon";
const Wrapped = styled.div`
  color: rgba(0, 0, 0, 0.65);
  padding-top: 64px;
`;
const Container = styled(Paper)`
  display: block;
  width: 40%;
  background: #ffff;
  margin: 0px auto;
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

function BuyProduct(props) {
  const [selectedOption, setSelectedOption] = useState("AtHome");
  const [info, setInfo] = useState({
    name: "Nguyen Van A",
    gender: 0,
    phone: "0123456789",
  });
  const [edit, setEdit] = React.useState(false);
  const oldInfoForm = useRef(null);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const CustomButtom = styled(Button)`
    background: ${(props) => props.theme.palette.color2.main};
    &:hover {
      background: ${(props) => props.theme.palette.color1.main};
      color: #fff;
    }
  `;
  return (
    <Wrapped>
      <Helmet>
        <title>Thanh toán | The Duck Mobile</title>
        <meta name="description" content="Thanh  | The Duck Mobile" />
      </Helmet>
      <Container elevation={4}>
        <Box
          paddingLeft={4}
          paddingRight={4}
          sx={{
            paddingBottom: "0.4rem",
            borderBottom: "1px solid #838080",
          }}
        >
          {/* Phần tiêu đề */}
          <Stack
            direction={"row"}
            marginBottom={"2.5rem"}
            alignItems={"center"}
          >
            <IconButton aria-label="back">
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h4" textAlign={"center"} width={"100%"}>
              Giỏ Hàng Của Bạn
            </Typography>
          </Stack>

          {/* Phần thông tin sản phẩm */}
          <Stack direction={"column"} spacing={3}>
            <ProductInformation color={"red"} fontWeight={"bold"} />
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"textcustom"}>Tạm tính</Typography>
                <Typography variant={"textcustom"}>(1 sản phẩm):</Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography variant={"textcustom"}>39.000.000</Typography>
                <Unit />
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction={"column"}
          paddingLeft={4}
          paddingRight={4}
          paddingTop={2}
          spacing={0}
        >
          <Typography
            variant={"h6"}
            fontWeight={"600"}
            style={{
              fontSize: "16px",
            }}
          >
            THÔNG TIN KHÁCH HÀNG
          </Typography>
          {info !== null ? (
            <>
              <Stack
                ref={oldInfoForm}
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="h6"
                  fontWeight={"400"}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Xin chào, anh <b>Nguyen Van A</b> - 8391231271298{" "}
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: "#484B5B",
                  }}
                  onClick={(e) => {
                    setEdit(true);
                    oldInfoForm.current.style.display = "none";
                  }}
                >
                  Sửa
                </Button>
              </Stack>
              {edit && (
                <NewCustomerInfomation
                  info={info}
                  onChange={(newInfo) => {
                    setInfo(newInfo);
                  }}
                />
              )}
            </>
          ) : (
            <NewCustomerInfomation />
          )}
        </Stack>
        <Stack
          direction={"column"}
          paddingLeft={4}
          paddingRight={4}
          paddingTop={2}
        >
          <Typography
            variant={"h6"}
            fontWeight={"600"}
            style={{
              fontSize: "16px",
            }}
          >
            CÁCH THỨC NHẬN HÀNG
          </Typography>
          <FormControl>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              value={selectedOption}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="AtHome"
                className="custom-radio"
                control={<Radio size="small" />}
                label={<span style={{ fontSize: "14px" }}>Giao tận nơi</span>}
              />
              <FormControlLabel
                value="AtStore"
                control={<Radio size="small" />}
                label={
                  <span style={{ fontSize: "14px" }}>Nhận tại cửa hàng</span>
                }
              />
            </RadioGroup>
          </FormControl>
          {selectedOption === "AtHome" && <ListCustomerAddress />}
          {selectedOption === "AtStore" && <AtStoreDeliver />}
        </Stack>
        <Box
          paddingLeft={4}
          paddingRight={4}
          paddingTop={2}
          sx={{
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #838080",
          }}
        >
          <MuiTextFeild
            variant="outlined"
            size={"medium"}
            fullWidth
            label="Yêu cầu khác"
          />
        </Box>

        <UseCoupon />
        <Stack direction={"column"} paddingX={4} paddingTop={2}>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h6"
              fontWeight={"600"}
              style={{
                fontSize: "16px",
              }}
            >
              Tổng tiền:{" "}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={"550"}
              color={"red"}
              style={{
                fontSize: "16px",
              }}
            >
              <FormatCurrency amount={39000000} />
            </Typography>
          </Stack>
          <CustomButtom
            variant="contained"
            fullWidth
            sx={{ marginTop: "1rem" }}
          >
            Mua hàng
          </CustomButtom>
        </Stack>
      </Container>
    </Wrapped>
  );
}

export default BuyProduct;
