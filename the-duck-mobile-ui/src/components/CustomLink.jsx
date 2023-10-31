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
  fontWeight: PropTypes.string,
};

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};

  &:hover {
    text-decoration: none;
    color: ${(props) => (props.colorHover ? props.colorHover : "")} !important;
  }
`;

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
