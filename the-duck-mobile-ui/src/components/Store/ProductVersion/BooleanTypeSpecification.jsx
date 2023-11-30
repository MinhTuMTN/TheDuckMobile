import styled from "@emotion/styled";
import { Checkbox, Grid, Typography } from "@mui/material";
import React from "react";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
}));
function BooleanTypeSpecification(props) {
  const { value, lable, onChange } = props;
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
          {lable} {props.isRequired ? "*" : ""}{" "}
        </Typography>
      </Grid>
      <Grid item xs={7} md={9.25}>
        <StyledCheckbox
          size={"small"}
          checked={value ? value : false}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
}

export default BooleanTypeSpecification;
