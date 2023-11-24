import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CustomTextField = styled(TextField)`
  input {
    height: 100%;
  }

  label {
    ${(props) =>
      !props.multiline &&
      props.size === "small" &&
      "font-size: 0.85rem !important;"}
  }
`;

MuiTextFeild.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  multiline: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
};

MuiTextFeild.defaultProps = {
  multiline: false,
  fullWidth: false,
  error: false,
  helperText: "",
};

function MuiTextFeild(props) {
  const {
    label,
    name,
    value,
    size,
    multiline,
    onChange,
    error,
    helperText,
    children,
    color,
    fullWidth,
    ...others
  } = props;

  return (
    <CustomTextField
      autoComplete="off"
      variant="outlined"
      error={error}
      helperText={helperText}
      label={label}
      name={name}
      size={size}
      multiline={multiline}
      value={value}
      onChange={onChange}
      style={props.style}
      color={color}
      InputProps={{ style: { fontSize: props.fontSize } }}
      fullWidth={fullWidth}
      {...others}
    >
      {children}
    </CustomTextField>
  );
}

export default MuiTextFeild;
