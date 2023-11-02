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
import React from "react";
// import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import CustomLink from "./CustomLink";

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
    icon: null,
    to: "/admin/customer-management/list",
    section: "customer-management",
  },
  {
    display: "Nhân Viên",
    icon: null,
    to: "/admin/staff-management/list",
    section: "staff-management",
  },
  {
    display: "Tài Khoản",
    icon: null,
    to: "/admin/account-management/list",
    section: "account-management",
  },
  {
    display: "Sản Phẩm",
    icon: null,
    to: "/admin/product-management/list",
    section: "product-management",
  },
  {
    display: "Danh Mục",
    icon: null,
    to: "/admin/catalog-management/list",
    section: "catalog-management",
  },
  {
    display: "Thương Hiệu",
    icon: null,
    to: "/admin/brand-management/list",
    section: "brand-management",
  },
  {
    display: "Tính Năng Đặc Biệt",
    icon: null,
    to: "/admin/special-feature-management/list",
    section: "special-feature-management",
  },
  {
    display: "Chi Nhánh",
    icon: null,
    to: "/admin/store-management/list",
    section: "store-management",
  },
  {
    display: "Hệ Điều Hành",
    icon: null,
    to: "/admin/os-management/list",
    section: "os-management",
  },
  {
    display: "Đơn Hàng",
    icon: null,
    to: "/admin/order-management/list",
    section: "order-management",
  },
  {
    display: "Mã Giảm Giá",
    icon: null,
    to: "/admin/promotion-management/list",
    section: "promotion-management",
  },
  {
    display: "Phản Hồi",
    icon: null,
    to: "/admin/feedback-management/list",
    section: "feedback-management",
  },
];

function AdminSidebar(props) {
  // const [section, setSection] = useState('')

  const location = useLocation();
  const currentSection = location.pathname
    .split("/")
    .filter((part) => part !== "")[1];
  const activeSection = sidebarItems.find(
    (item) => item.section === currentSection
  ).section;
  console.log(currentSection);
  console.log(activeSection);

  // useEffect(() => {
  //   setSection(activeSection);
  //   console.log(currentSection);
  //   console.log(section);
  // }, [])

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
        >
          Quản Lý
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
    </Sidebar>
  );
}

export default AdminSidebar;
