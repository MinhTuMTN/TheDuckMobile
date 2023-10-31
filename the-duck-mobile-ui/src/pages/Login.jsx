import styled from "@emotion/styled";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import pic from "../assets/login.jpg";
import { useAuth } from "../auth/AuthProvider";
import MuiTextFeild from "../components/MuiTextFeild";
import { login } from "../services/AuthService";

const Wrapper = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledInput = styled(MuiTextFeild)`
  div {
    border-radius: 1rem;
  }
`;
function Login(props) {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await login({
      email: "admin@gmail.com",
      password: "12345",
    });
    console.log(response.data);

    if (response.success) {
      setToken(response.data.data);
      navigate("/", { replace: true });
    }
  };

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} justifyContent={"center"} display={"flex"}>
          <img src={pic} alt="Login" width={"60%"} />
        </Grid>
        <Grid item xs={12} md={6} alignItems={"center"} display={"flex"}>
          <Paper
            style={{
              width: "80%",
              height: "80%",
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
            <Box
              sx={{
                width: "100%",
              }}
            >
              <StyledInput label="Số điện thoại" required />
            </Box>
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
              Tiếp tục
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Login;
