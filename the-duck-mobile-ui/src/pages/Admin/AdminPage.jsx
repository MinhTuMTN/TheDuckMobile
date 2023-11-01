import styled from "@emotion/styled";
import { Box, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from 'react'

const RootPageUser = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
}));

const Right = styled(Box)(({ theme }) => ({
  flex: 7,
  display: "flex",
}));

function AdminPage(props) {

  return (

      <RootPageUser>
        <AdminSidebar />
        <Right>
          <Outlet />
        </Right>
      </RootPageUser>

  );
}

export default AdminPage;