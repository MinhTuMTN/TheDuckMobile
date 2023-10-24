import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const StyledMain = styled(Box)(({ theme }) => ({
  marginTop: "80px",
  minHeight: "50vh",
}));

function MainLayout(props) {
  return (
    <>
      <Helmet>
        <title>The Duck Mobile</title>
        <meta name="description" content="The Duck Mobile" />
      </Helmet>
      <Navbar />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
}

export default MainLayout;
