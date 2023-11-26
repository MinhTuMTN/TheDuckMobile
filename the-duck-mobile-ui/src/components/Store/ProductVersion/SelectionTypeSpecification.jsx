import styled from "@emotion/styled";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const StyledMenuItemContent = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  textAlign: "center",
}));

SelectionTypeSpecification.prototype = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SelectionTypeSpecification.defaultProps = {
  label: "",
  options: [],
  value: "",
  onChange: () => {},
};

function SelectionTypeSpecification(props) {
  const { lable, options, value, onChange } = props;
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
      <Select
        size="small"
        style={{ minWidth: "10rem" }}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={`option-${option}-${index}`} value={option}>
            <StyledMenuItemContent>{option}</StyledMenuItemContent>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

export default SelectionTypeSpecification;
