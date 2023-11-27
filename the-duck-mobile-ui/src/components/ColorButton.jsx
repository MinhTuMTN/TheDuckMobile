import { Typography } from "@mui/material";
import React from "react";

function ColorButton(props) {
  return (
    <Typography
      component={"span"}
      sx={{
        display: "inline-block",
        width: props.width || "1rem",
        height: props.height || "1rem",
        backgroundColor: props.color || "black",
        borderRadius: "50%",
      }}
    >
      {props.children}
    </Typography>
  );
}

export default ColorButton;
