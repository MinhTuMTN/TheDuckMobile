import styled from "@emotion/styled";
import { Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
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
    <Grid container alignItems={"center"}>
      <Grid item xs={5} md={2.75}>
        <Typography
          variant="body1"
          fontWeight="600"
          style={{
            minWidth: "10rem",
          }}
        >
          {lable} {props.isRequired ? "*" : ""}
        </Typography>
      </Grid>
      <Grid item xs={7} md={9.25}>
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
      </Grid>
    </Grid>
  );
}

export default SelectionTypeSpecification;
