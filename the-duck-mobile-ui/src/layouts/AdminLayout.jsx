import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import React, { Fragment } from 'react'
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootPageUser = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  marginTop: theme.spacing(12),
}));

const Right = styled(Box)(({ theme }) => ({
  flex: 7,
  display: "flex",
}));

function AdminLayout(props) {
  return (
    <Fragment>
      <Navbar />
      <RootPageUser>
        <AdminSidebar />
        <Right>
          <Outlet />
        </Right>
      </RootPageUser>
      <Footer />
    </Fragment>
  );
}

export default AdminLayout;