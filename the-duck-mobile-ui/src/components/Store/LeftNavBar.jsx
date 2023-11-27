import styled from "@emotion/styled";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import RedeemIcon from "@mui/icons-material/Redeem";
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
import PropTypes from "prop-types";
import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import pic from "../../assets/logo-removebg-preview.jpg";

const sidebarItems = [
  {
    display: "Sản phẩm",
    icon: <PersonIcon />,
    to: "/store/products",
  },

  {
    display: "Đơn hàng",
    icon: <HomeIcon />,
    to: "/store/orders",
  },
  {
    display: "Thống kê",
    icon: <RedeemIcon />,
    to: "/store/analytics",
  },
];

const CustomListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  marginRight: theme.spacing(0.5),
  width: "100%",
  color: "white",

  "&:hover": {
    backgroundColor: active === "true" ? "#333860da" : "#3a3d5685",
  },
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(2.5)}`,
  color: "white",
  transform: "scale(1.1)",
}));

function LeftNavBar(props) {
  const { open, onOpenClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isIndexPage = useMatch("/store");
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
      <List>
        {sidebarItems.map((item, index) => (
          <NavLink
            key={`nav-bar-store-${index}`}
            style={{ textDecoration: "none" }}
            to={item.to}
            className={({ isActive, isPending }) =>
              isActive || (isIndexPage && item.display === "Sản phẩm")
                ? "nav-active"
                : ""
            }
          >
            <ListItem disablePadding key={item.section}>
              <CustomListItemButton>
                <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                <ListItemText
                  disableTypography
                  style={{ color: "#b5bac0 !important", fontSize: "14px" }}
                  primary={item.display}
                />
              </CustomListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #000428 0%, #043765 100%)",
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
          background: "linear-gradient(180deg, #000428 0%, #043765 100%)",
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
