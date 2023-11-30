import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
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
    <Grid container spacing={[1, 2]} alignItems={"center"}>
      <Grid item xs={12} md={2.75}>
        <Typography
          variant="body1"
          fontWeight="600"
          style={{
            width: "100%",
          }}
        >
          {lable} {props.isRequired ? "*" : ""}
        </Typography>
      </Grid>
      <Grid item xs={12} md={9.25}>
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
      </Grid>
    </Grid>
  );
}

export default NormalTypeSpecifcation;
