import styled from "@emotion/styled";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import pic from "../../assets/logo-removebg-preview.jpg";
const Scrollbar = styled(SimpleBar)(({ theme }) => ({
  height: "100%",
  "& .simplebar-content": {
    height: "100%",
  },
  "& .simplebar-scrollbar:before": {
    background: "red",
  },
}));
function LeftNavBar(props) {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const content = (
    <Scrollbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ paddingTop: 3, paddingX: 1.5 }}>
          <Box
            sx={{
              height: "5rem",
              width: "2rem",
              display: "inline-flex",
              direction: "row",
            }}
          >
            <img alt="logo" src={pic} />
            <Typography variant="h6" sx={{ color: "white" }}>
              The Duck Mobile
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "#4e4846" }} />
      </Box>
    </Scrollbar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #FF416C 0%, #f38b57 100%)",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}
LeftNavBar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
export default LeftNavBar;
