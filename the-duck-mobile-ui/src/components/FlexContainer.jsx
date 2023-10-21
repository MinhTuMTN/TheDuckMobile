import styled from "@emotion/styled";
import { Box } from "@mui/system";
import React from "react";

const StyledFlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
}));

function FlexContainer(props) {
  const { direction, alignItems, justifyContent, ...other } = props;
  return (
    <StyledFlexContainer
      sx={{
        flexDirection: direction ? direction : "row",
        alignItems: alignItems ? alignItems : "center",
        justifyContent: justifyContent ? justifyContent : "flex-start",
      }}
      {...other}
    >
      {props.children}
    </StyledFlexContainer>
  );
}

export default FlexContainer;
