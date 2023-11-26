import styled from "@emotion/styled";
import { Checkbox, Stack, Typography } from "@mui/material";
import React from "react";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
}));
function BooleanTypeSpecification(props) {
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
      <StyledCheckbox size={"small"} checked={value} onChange={onChange} />
    </Stack>
  );
}

export default BooleanTypeSpecification;
