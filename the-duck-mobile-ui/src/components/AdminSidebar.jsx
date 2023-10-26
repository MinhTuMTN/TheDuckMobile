import styled from "@emotion/styled";
import { Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from 'react'
// import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = styled(Paper)(({ theme }) => ({
  flex: 2,
  display: "flex",
  marginBottom: theme.spacing(5),
}));

const CustomListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  backgroundColor: (active ? "#86C8BC" : ""),
  borderRadius: "0 25px 25px 0",
  width: "100%",

  "&:hover": {
    backgroundColor: (active ? "#86C8BC" : "#EAFAF7"),
  }
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(2.5)}`,
  color: "black",
  transform: "scale(1.1)",
}));

const sidebarItems = [
  {
    display: 'Quản Lý Người Dùng',
    icon: null,
    to: '/admin/user-management/list',
    section: 'user-management'
  },
  {
    display: 'Quản Lý Sản Phẩm',
    icon: null,
    to: '/admin/product-management/list',
    section: 'product-management'
  },
  {
    display: 'Quản Lý Danh Mục',
    icon: null,
    to: '/admin/catalog-management/list',
    section: 'catalog-management'
  },
  {
    display: 'Quản Lý Thương Hiệu',
    icon: null,
    to: '/admin/brand-management/list',
    section: 'brand-management'
  }
]

function AdminSidebar(props) {
  // const [section, setSection] = useState('')

  const location = useLocation();
  const currentSection = location.pathname.split('/').filter(part => part !== '')[1];
  const activeSection = sidebarItems.find(item => item.section === currentSection).section;
    console.log(currentSection);
    console.log(activeSection);

  // useEffect(() => {
  //   setSection(activeSection);
  //   console.log(currentSection);
  //   console.log(section);
  // }, []) 

  return (
        <Sidebar>
          <List>
            {sidebarItems.map((item, index) => (

              <ListItem disablePadding key={item.section}>
                <CustomListItemButton
                  active={activeSection === item.section}
                  to={item.to}
                  // onClick={() => {
                  //   setSection(item.section);
                  // }}
                >
                  <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                  <ListItemText primary={item.display} />
                </CustomListItemButton>
              </ListItem>
            ))}
          </List>
        </Sidebar>
  );
}

export default AdminSidebar;