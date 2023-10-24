import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CustomTextField = styled(TextField)(({ theme }) => ({
  input: {
    height: "100%",
  },
}));

MuiTextFeild.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  fontSize: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.node,
};

function MuiTextFeild(props) {
  const {
    label,
    name,
    value,
    onChange,
    error = null,
    children,
    ...others
  } = props;

  return (
    <CustomTextField
      variant="outlined"
      InputProps={{ style: { fontSize: props.fontSize } }}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      style={props.style}
      {...(error && { error: true, helperText: error })}
      {...others}
      fullWidth
    >
      {children}
    </CustomTextField>
  );
}

export default MuiTextFeild;
