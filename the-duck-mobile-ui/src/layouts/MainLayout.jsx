import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

const StyledMain = styled(Box)(({ theme }) => ({
  marginTop: "80px",
  minHeight: "50vh",
}));

function MainLayout(props) {
  return (
    <>
      <Navbar />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
}

export default MainLayout;
