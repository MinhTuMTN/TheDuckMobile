import React from "react";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import TabletIcon from "@mui/icons-material/Tablet";
import WatchIcon from "@mui/icons-material/Watch";
import FlexContainer from "./FlexContainer";
import styled from "@emotion/styled";
import { Icon, Paper } from "@mui/material";

const bannerData = [
  {
    id: 1,
    title: "Điện Thoại",
    icon: <PhoneAndroidIcon />,
  },
  {
    id: 2,
    title: "Laptop",
    icon: <LaptopChromebookIcon />,
  },
  {
    id: 3,
    title: "Máy Tính Bảng",
    icon: <TabletIcon />,
  },
  {
    id: 4,
    title: "Smart Watch",
    icon: <WatchIcon />,
  },
];

const HomeCatalogItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.color1.main,
  color: "white",
  display: "flex",
  flexBasis: "23%",
  justifyContent: "space-evenly",
  alignContent: "center",
  padding: theme.spacing(2) + " " + theme.spacing(1),
  borderRadius: theme.spacing(2),
}));

const Container = styled(FlexContainer)(({ theme }) => ({
  justifyContent: "space-between",
  width: "100%",
  padding: theme.spacing(2) + " " + theme.spacing(0),
}));

const HomeCatalogs = () => {
  return (
    <Container justifyContent="center">
      {bannerData &&
        bannerData.map((single, key) => {
          return (
            <HomeCatalogItem
              square={false}
              data={single}
              key={key}
              elevation={2}
            >
              <Icon style={{ transform: "scale(1.4)" }}>{single.icon}</Icon>
              <span>{single.title}</span>
            </HomeCatalogItem>
          );
        })}
    </Container>
  );
};

export default HomeCatalogs;
