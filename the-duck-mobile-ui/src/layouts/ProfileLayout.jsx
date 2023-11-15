import styled from "@emotion/styled";
import { LocalShippingOutlined, Person2Outlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { createContext, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import CustomLink from "../components/CustomLink";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getInfo } from "../services/UserService";

const LogOutButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.color2.main,
    color: "white",
  },
}));

const UserInfoContext = createContext(null);

function ProfileLayout(props) {
  const { setToken } = useAuth();

  const handleLogout = useCallback(() => {
    setToken(null);
    window.location.href = "/";
  }, [setToken]);

  const [info, setInfo] = React.useState(null);
  const handleGetInfo = useCallback(async () => {
    const response = await getInfo();
    if (response.success) setInfo(response.data.data);
    else {
      setInfo(null);
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    handleGetInfo();
  }, [handleGetInfo]);
  return (
    <UserInfoContext.Provider value={[info, setInfo]}>
      <Helmet>
        <title>The Duck Mobile</title>
        <meta name="description" content="The Duck Mobile" />
      </Helmet>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
        mt={20}
        padding={2}
      >
        <Grid
          container
          style={{ width: "80%" }}
          gap={2.5}
          flexWrap={"nowrap"}
          justifyContent={"space-between"}
        >
          <Grid
            item
            xs={12}
            md={3}
            component={Paper}
            elevation={3}
            padding={3}
            height={"fit-content"}
          >
            <Typography
              variant="body1"
              component="h1"
              style={{ fontSize: "1rem" }}
            >
              <b>Xin chào, {info && info.fullName}</b>
            </Typography>
            <Divider
              sx={{ borderColor: "rgba(0,0,0,0.5)", margin: "0.5rem 0rem" }}
            />
            <Stack direction={"row"} spacing={2}>
              <Person2Outlined color={"black"} />
              <CustomLink to={""}>
                <Typography variant="body1" component="h1">
                  Thông tin cá nhân
                </Typography>
              </CustomLink>
            </Stack>
            <Stack direction={"row"} spacing={2} mt={1}>
              <LocalShippingOutlined />
              <CustomLink to={"order-history"}>
                <Typography variant="body1" component="h1">
                  Đơn hàng
                </Typography>
              </CustomLink>
            </Stack>
            <Divider
              sx={{ borderColor: "rgba(0,0,0,0.5)", margin: "0.5rem 0rem" }}
            />
            <LogOutButton
              variant="outlined"
              fullWidth
              color="color1"
              style={{ marginTop: "0.5rem" }}
              onClick={handleLogout}
            >
              Đăng xuất
            </LogOutButton>
          </Grid>
          <Grid item xs={12} md={9} component={Paper} elevation={3} padding={3}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </UserInfoContext.Provider>
  );
}

export { UserInfoContext };

export default ProfileLayout;
