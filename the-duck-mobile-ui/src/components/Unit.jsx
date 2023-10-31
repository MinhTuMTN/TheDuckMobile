import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

Unit.propTypes = {
  color: PropTypes.string,
};

function Unit(props) {
  const { color } = props;
  return (
    <Typography
      variant="textcustom"
      style={{
        fontSize: "14px",
        color: color,
      }}
    >
      ₫
    </Typography>
  );
}

export default Unit;
