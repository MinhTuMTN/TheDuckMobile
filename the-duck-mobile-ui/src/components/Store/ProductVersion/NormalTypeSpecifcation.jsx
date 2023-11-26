import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import MuiTextFeild from "../../MuiTextFeild";

const StyledMuiTextFeild = styled(MuiTextFeild)(({ theme }) => ({
  // StyledInput
  "& .MuiInputBase-root": {
    borderRadius: "0.5rem",

    fontSize: "14px",
    fontWeight: "400",
    color: "#000",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
}));

NormalTypeSpecifcation.prototype = {
  value: PropTypes.string,
  lable: PropTypes.string,
  onChange: PropTypes.func,
};

NormalTypeSpecifcation.defaultProps = {
  value: "",
  lable: "",
  onChange: () => {},
};

function NormalTypeSpecifcation(props) {
  const { value, lable, onChange } = props;
  return (
    <Stack flexDirection={"row"} alignItems={"center"}>
      <Typography
        variant="body1"
        fontWeight="600"
        style={{
          minWidth: "10rem",
        }}
      >
        {lable} {props.isRequired ? "*" : ""}
      </Typography>
      <StyledMuiTextFeild
        size={"small"}
        fullWidth
        value={value}
        onChange={onChange}
        error={props.isRequired && value === ""}
        helperText={
          props.isRequired && value === "" ? "Trường này là bắt buộc" : ""
        }
      />
    </Stack>
  );
}

export default NormalTypeSpecifcation;
