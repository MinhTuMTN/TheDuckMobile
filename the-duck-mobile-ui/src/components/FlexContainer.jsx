import styled from "@emotion/styled";
import { Box } from "@mui/system";
import React from "react";

const StyledFlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
}));

function FlexContainer(props) {
  const { direction, alignItems, justifyContent, margin, ...other } = props;
  return (
    <StyledFlexContainer
      sx={{
        flexDirection: direction ? direction : "row",
        alignItems: alignItems ? alignItems : "center",
        justifyContent: justifyContent ? justifyContent : "flex-start",
        margin: { margin },
      }}
      {...other}
    >
      {props.children}
    </StyledFlexContainer>
  );
}

export default FlexContainer;
