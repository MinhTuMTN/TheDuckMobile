import styled from "@emotion/styled";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

CustomLink.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  replace: PropTypes.bool,
  to: PropTypes.string,
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: "bold",
}));

function CustomLink(props) {
  const { width, height, ...other } = props;
  return (
    <StyledLink
      sx={{
        width: width ? width : "100%",
        height: height ? height : "100%",
      }}
      style={{ color: props.color ? props.color : "#141E46" }}
      replace={props.replace}
      to={props.to}
      {...other}
    >
      {props.children}
    </StyledLink>
  );
}

export default CustomLink;
