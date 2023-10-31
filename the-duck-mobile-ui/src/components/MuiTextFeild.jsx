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
  fontSize: PropTypes.string || PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.node,
};

MuiTextFeild.defaultProps = {
  multiline: false,
};

function MuiTextFeild(props) {
  const {
    label,
    name,
    value,
    size,
    multiline,
    onChange,
    error = null,
    children,
    ...others
  } = props;

  return (
    <CustomTextField
      variant="outlined"
      label={label}
      name={name}
      size={size}
      multiline={multiline}
      value={value}
      onChange={onChange}
      style={props.style}
      {...(error && { error: true, helperText: error })}
      InputProps={{ style: { fontSize: props.fontSize } }}
      {...others}
      fullWidth
    >
      {children}
    </CustomTextField>
  );
}

export default MuiTextFeild;
