import styled from "@emotion/styled";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomLink from "./CustomLink";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import RedeemIcon from '@mui/icons-material/Redeem';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import StoreIcon from '@mui/icons-material/Store';
import DevicesIcon from '@mui/icons-material/Devices';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DiscountIcon from '@mui/icons-material/Discount';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Sidebar = styled(Paper)(({ theme }) => ({
  display: "flex",
  flex: 2,
  flexDirection: "column",
  margin: `${theme.spacing(1)} 0 ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const CustomListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  backgroundColor: active ? "#86C8BC" : "",
  borderRadius: "0 25px 25px 0",
  marginRight: theme.spacing(0.5),
  width: "100%",

  "&:hover": {
    backgroundColor: active ? "#86C8BC" : "#EAFAF7",
  },
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(2.5)}`,
  color: "black",
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
    display: "Nhân Viên",
    icon: <BadgeIcon />,
    to: "/admin/staff-management/list",
    section: "staff-management",
  },
  {
    display: "Địa chỉ",
    icon: <HomeIcon />,
    to: "/admin/address-management/province/list",
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
    to: "/admin/brand-management/list",
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
    to: "/admin/promotion-management/list",
    section: "promotion-management",
  },
  {
    display: "Phản Hồi",
    icon: <FeedbackIcon />,
    to: "/admin/feedback-management/list",
    section: "feedback-management",
  },
];

function AdminSidebar(props) {
  const location = useLocation();
  const currentSection = location.pathname
    .split("/")
    .filter((part) => part !== "")[1];
  const activeSection = sidebarItems.find(
    (item) => item.section === currentSection
  ).section;

  return (
    <Sidebar>
      <Divider
        textAlign="center"
        sx={{
          width: "100%",
          height: "1px",
          margin: "1rem 0 0.5rem 0",
          borderColor: "black",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
          style={{
            fontSize: "16px",
          }}
        >
          <ManageAccountsIcon /> Quản Lý
        </Typography>
      </Divider>
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem disablePadding key={item.section}>
            <CustomLink to={item.to} width={"100%"}>
              <CustomListItemButton active={activeSection === item.section}>
                <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                <ListItemText primary={item.display} />
              </CustomListItemButton>
            </CustomLink>
          </ListItem>
        ))}
      </List>
      <Divider
        textAlign="center"
        sx={{
          width: "100%",
          height: "1px",
          margin: "1rem 0 0.5rem 0",
          borderColor: "black",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
          style={{
            fontSize: "16px"
          }}
        >
          <AnalyticsIcon /> Thống Kê
        </Typography>
      </Divider>
    </Sidebar>
  );
}

export default AdminSidebar;
