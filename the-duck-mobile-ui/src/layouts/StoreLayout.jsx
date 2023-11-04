import styled from "@emotion/styled";
import React from "react";
import TopNavbar from "../components/Store/TopNavbar";
import LeftNavBar from "../components/Store/LeftNavBar";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

function StoreLayout(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TopNavbar onNavOpen={() => setOpen(true)} />
      <LeftNavBar onClose={() => setOpen(false)} open={open} />
      <LayoutRoot>
        <LayoutContainer>{props.children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default StoreLayout;
