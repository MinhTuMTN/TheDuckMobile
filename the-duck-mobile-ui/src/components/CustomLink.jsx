import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: "bold",
  color: theme.palette.text.color4,
}));

function CustomLink(props) {
  const { width, height, ...other } = props;
  return (
    <StyledLink
      sx={{
        width: width ? width : "100%",
        height: height ? height : "100%",
      }}
      {...other}
    >
      {props.children}
    </StyledLink>
  );
}

export default CustomLink;
