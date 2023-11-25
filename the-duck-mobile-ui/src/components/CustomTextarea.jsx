import { Stack, Typography, styled } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const CustomTextField = styled("textarea")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  padding: "12px",
  boxSizing: "border-box",
  border: theme.error ? "1px solid #f44336" : "1px solid #e0e0e0",
  borderRadius: "4px",
  backgroundColor: "#f8f8f8",
  fontSize: "14px",
  resize: "none",
  fontFamily: "inherit",
  outline: "none",
}));

CustomTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

CustomTextField.defaultProps = {
  label: "",
  value: "",
  onChange: () => {},
  rows: 4,
  placeholder: "",
  error: false,
  helperText: "",
};

function CustomTextarea(props) {
  return (
    <Stack>
      <Typography variant="body1" sx={{ fontWeight: "600" }}>
        {props.label} {props.required && <span>*</span>}
      </Typography>
      <CustomTextField
        style={{
          border: props.error ? "1px solid #C70039" : "1px solid #e0e0e0",
        }}
        rows={props.rows}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      <Typography
        variant="caption"
        sx={{
          color: props.error ? "#C70039" : "#6c757d",
          marginTop: "4px",
        }}
      >
        {props.helperText}
      </Typography>
    </Stack>
  );
}

export default CustomTextarea;
