import styled from "@emotion/styled";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DevicesIcon from "@mui/icons-material/Devices";
import DiscountIcon from "@mui/icons-material/Discount";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import RedeemIcon from "@mui/icons-material/Redeem";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";
import pic from "../assets/logo-removebg-preview.jpg";

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
import { useLocation } from "react-router-dom";
import CustomLink from "./CustomLink";

const CustomListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  backgroundColor: active === "true" ? "#333860da" : "",
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

const sidebarItems = [
  {
    display: "Khách Hàng",
    icon: <PersonIcon />,
    to: "/admin/customer-management/list",
    section: "customer-management",
  },

  {
    display: "Địa chỉ",
    icon: <HomeIcon />,
    to: "/admin/address-management/province",
    section: "address-management",
  },
  {
    display: "Sản Phẩm",
    icon: <RedeemIcon />,
    to: "/admin/product-management/list",
    section: "product-management",
  },
  {
    display: "Danh Mục",
    icon: <CategoryIcon />,
    to: "/admin/catalog-management/list",
    section: "catalog-management",
  },
  {
    display: "Thương Hiệu",
    icon: <BrandingWatermarkIcon />,
    to: "/admin/brand-management",
    section: "brand-management",
  },
  {
    display: "Màu Sắc",
    icon: <ColorLensIcon />,
    to: "/admin/color-management/list",
    section: "color-management",
  },
  {
    display: "Tính Năng Đặc Biệt",
    icon: <SettingsSuggestIcon />,
    to: "/admin/special-feature-management/list",
    section: "special-feature-management",
  },
  {
    display: "Chi Nhánh",
    icon: <StoreIcon />,
    to: "/admin/store-management/list",
    section: "store-management",
  },
  {
    display: "Hệ Điều Hành",
    icon: <DevicesIcon />,
    to: "/admin/os-management/list",
    section: "os-management",
  },
  {
    display: "Đơn Hàng",
    icon: <ShoppingBagIcon />,
    to: "/admin/order-management/list",
    section: "order-management",
  },
  {
    display: "Mã Giảm Giá",
    icon: <DiscountIcon />,
    to: "/admin/coupon-management/list",
    section: "coupon-management",
  },
  {
    display: "Phản Hồi",
    icon: <FeedbackIcon />,
    to: "/admin/feedback-management/list",
    section: "feedback-management",
  },
];

function AdminSidebar(props) {
  const { open, onOpenClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const location = useLocation();
  const currentSection = location.pathname
    .split("/")
    .filter((part) => part !== "")[1];
  const activeSection = sidebarItems.find(
    (item) => item.section === currentSection
  )?.section;

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

          <Typography
            variant="h6"
            paddingX={3}
            paddingTop={4}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {" "}
            QUẢN LÝ{" "}
          </Typography>

          <List>
            {sidebarItems.map((item, index) => (
              <ListItem disablePadding key={item.section}>
                <CustomLink to={item.to} width={"100%"}>
                  <CustomListItemButton
                    active={activeSection === item.section ? "true" : "false"}
                  >
                    <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                    <ListItemText
                      disableTypography
                      style={{ color: "#b5bac0 !important", fontSize: "14px" }}
                      primary={item.display}
                    />
                  </CustomListItemButton>
                </CustomLink>
              </ListItem>
            ))}
          </List>
          <Typography
            variant="h6"
            paddingX={3}
            paddingBottom={4}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {" "}
            THỐNG KÊ{" "}
          </Typography>
        </Box>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              paddingTop: 1,
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
          <Typography
            variant="body1"
            paddingX={3}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
              paddingTop: "10px",
            }}
          >
            QUẢN LÝ{" "}
          </Typography>

          <List>
            {sidebarItems.map((item, index) => (
              <ListItem disablePadding key={item.section}>
                <CustomLink to={item.to} width={"100%"}>
                  <CustomListItemButton active={activeSection === item.section}>
                    <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                    <ListItemText
                      disableTypography
                      style={{ color: "#b5bac0 !important", fontSize: "14px" }}
                      primary={item.display}
                    />
                  </CustomListItemButton>
                </CustomLink>
              </ListItem>
            ))}
          </List>
          <Typography
            variant="h6"
            paddingX={3}
            paddingBottom={4}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {" "}
            THỐNG KÊ{" "}
          </Typography>
        </Box>
      </Drawer>
    </SwipeableDrawer>
  );
}
AdminSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default AdminSidebar;
