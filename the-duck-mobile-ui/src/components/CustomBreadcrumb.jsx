import styled from "@emotion/styled";
import React from "react";
import CustomSeparator from "../components/CustomSeparator";
import PropTypes from "prop-types";
CustomBreadcrumb.prototype = {
  urls: PropTypes.array,
};

const BreadcrumbArea = styled("div")(({ theme }) => ({
  background: "#e9e9e9",
  paddingTop: "35px",
  width: "100%",
  paddingBottom: "35px",
  display: "flex",
  justifyContent: "center",
}));

const BreadcrumbContent = styled("div")(({ theme }) => ({
  width: "80%",
}));

function CustomBreadcrumb(props) {
  const { urls, ...others } = props;
  return (
    <BreadcrumbArea {...others}>
      <BreadcrumbContent>
        <CustomSeparator urls={urls} />
      </BreadcrumbContent>
    </BreadcrumbArea>
  );
}

export default CustomBreadcrumb;
