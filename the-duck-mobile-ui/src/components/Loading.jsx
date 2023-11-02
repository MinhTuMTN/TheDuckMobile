import styled from "@emotion/styled";
import React from "react";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
`;

function Loading(props) {
  return (
    <StyledContainer>
      <div className="loading"></div>
    </StyledContainer>
  );
}

export default Loading;
