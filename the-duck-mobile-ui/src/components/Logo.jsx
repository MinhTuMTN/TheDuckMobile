import React from "react";
import logo from "../assets/logo.jpg";
import { Avatar } from "@mui/material";

function Logo(props) {
  const { width, height, ...other } = props;
  return (
    <Avatar
      {...other}
      sx={{
        width: width ? width : "100%",
        height: height ? height : "100%",
      }}
      src={logo}
    />
  );
}

export default Logo;
