import styled from "@emotion/styled/macro";
import { Box, Card, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, { memo } from "react";
import CustomLink from "./CustomLink";
import Logo from "./Logo";

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100vw",
  backgroundColor: "white",
  display: "flex",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 100,
  boxShadow: "0 0 25px 0 rgba(0,0,0,.06)",
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  width: "100%",
  maxHeight: "80px",
  maxWidth: "1200px",
  margin: "0 auto",
}));

const Left = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
}));

const Center = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 2,
  justifyContent: "space-around",
}));

const Right = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flex: 1,
}));

const SubMenu = styled(Card)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: "0",
  display: "none",
  flexDirection: "column",
  textAlign: "left",
  backgroundColor: "#fff",
  boxShadow: "0 1px 7px -2px rgba(0,0,0,.3)",

  "& a": {
    fontSize: "0.8rem",
    padding: "7px 20px",
    display: "block",
  },
}));

const StyledLogo = styled(Logo)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginRight: "10px",
}));

const MenuItem = styled("span")(({ theme }) => ({
  position: "relative",
  "&:hover": {
    [SubMenu]: {
      display: "flex",
    },
  },
}));

const NavBar = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <Wrapper>
      <Container>
        <Left>
          <CustomLink to={"/"}>
            <StyledLogo />
          </CustomLink>
          <Typography variant="h5" component="h1">
            <CustomLink to={"/"}>The Duck Mobile</CustomLink>
          </Typography>
        </Left>
        <Center>
          <MenuItem>
            <CustomLink to={"/home"}>Trang chủ</CustomLink>
          </MenuItem>
          <MenuItem>
            <CustomLink to={"/home"}>Danh mục</CustomLink>
            <SubMenu sx={{ width: "150px" }}>
              <CustomLink>Điện thoại</CustomLink>
              <CustomLink>Laptop</CustomLink>
              <CustomLink>Máy tính bảng</CustomLink>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <CustomLink to={"/home"}>About us</CustomLink>
          </MenuItem>
          <MenuItem>
            <CustomLink to={"/home"}>Feedback</CustomLink>
          </MenuItem>
        </Center>
        <Right>
          <CustomLink to={"/cart"}>
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: "1.75rem",
                marginRight: "10px",
              }}
            />
          </CustomLink>
          <CustomLink to={"/home"}>
            <AccountCircleOutlinedIcon
              sx={{
                fontSize: "1.75rem",
              }}
            />
          </CustomLink>
        </Right>
      </Container>
    </Wrapper>
  );
};

export default memo(NavBar);
