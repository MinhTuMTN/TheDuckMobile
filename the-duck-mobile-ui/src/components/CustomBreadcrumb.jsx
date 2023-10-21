import styled from "@emotion/styled";
import React from "react";
import CustomSeparator from "../components/CustomSeparator";

function CustomBreadcrumb(props) {
  const BreadcrumbArea = styled("div")(({ theme }) => ({
    background: theme.palette.breadcrumb_gray.main,
    paddingTop: "35px",
    paddingBottom: "35px",
    display: "block",
  }));

  const Container = styled("div")(({ theme }) => ({
    display: "block",
    maxWidth: "720px",
    width: "100%",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: theme.spacing(8),
    textAlign: "left",
  }));

  const BreadcrumbContent = styled("div")(({ theme }) => ({
    display: "block",
  }));
  return (
    <BreadcrumbArea>
      <Container>
        <BreadcrumbContent>
          <CustomSeparator />
        </BreadcrumbContent>
      </Container>
    </BreadcrumbArea>
  );
}

export default CustomBreadcrumb;
