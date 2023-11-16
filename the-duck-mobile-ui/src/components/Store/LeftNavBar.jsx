import styled from "@emotion/styled";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import pic from "../../assets/logo-removebg-preview.jpg";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
function LeftNavBar(props) {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          paddingTop: 3,
          paddingX: 1,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            height: "4.5rem",
            width: "4.5rem",
            display: "flex",
            direction: "row",
          }}
        >
          <img alt="logo" src={pic} />
        </Box>
        <Typography variant="h5" sx={{ color: "white" }}>
          The Duck Mobile
        </Typography>
      </Box>
      <List
        sx={{
          paddingTop: 0,
          paddingLeft: 1,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Thống kê"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Thống kê"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Thống kê"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton color="white">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText
              secondary={"Thống kê"}
              sx={{
                color: "white",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
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
