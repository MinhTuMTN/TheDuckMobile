import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import pic from "../../assets/logo-removebg-preview.jpg";

import InboxIcon from "@mui/icons-material/MoveToInbox";
function LeftNavBar(props) {
  const { open, onOpenClose } = props;
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
    <SwipeableDrawer
      anchor="left"
      onClose={() => onOpenClose(false)}
      onOpen={() => onOpenClose(true)}
      open={open}
      PaperProps={{
        sx: {
          background: "linear-gradient(180deg, #FF416C 0%, #f38b57 100%)",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </SwipeableDrawer>
  );
}
LeftNavBar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
export default LeftNavBar;
