import { Box, Typography } from "@mui/material";
import React from "react";
import AddressList from "../components/AddressList";
import ProfileInformation from "../components/ProfileInformation";

function Profile(props) {
  return (
    <Box>
      <Typography variant="h4" component="h1">
        Thông tin tài khoản
      </Typography>

      <ProfileInformation margin={"1rem 0"} />
      <AddressList margin={"2rem 0"} />
    </Box>
  );
}

export default Profile;
