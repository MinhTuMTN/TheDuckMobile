import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import ProductGrid from "./ProductGrid";
import MuiButton from "./MuiButton";
import { Fragment } from "react";
import FlexContainer from "./FlexContainer";

const CustomTabList = styled(TabList)(({ theme }) => ({
  margin: "25px 0 0 0",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  width: "100%",
  fontSize: "22px",
}));

const CustomMuiButton = styled(MuiButton)(({ theme }) => ({
  fontSize: "1rem !important",
  backgroundColor: "#C70039",
  color: "#FFF",
  "&:hover": {
    backgroundColor: "#006451",
  },
}));

const TabProducts = () => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <Fragment>
      <TabContext value={tab}>
        <Box>
          <CustomTabList onChange={handleChangeTab} centered>
            <CustomTab label="Mới Nhất" value="1" />
            <CustomTab label="Bán Chạy" value="2" />
            <CustomTab label="Đánh Giá Cao" value="3" />
          </CustomTabList>
        </Box>
        <TabPanel value="1">
          <ProductGrid numberColumn={3} />
        </TabPanel>
        <TabPanel value="2">
          <ProductGrid numberColumn={3} />
        </TabPanel>
        <TabPanel value="3">
          <ProductGrid numberColumn={3} />
        </TabPanel>
      </TabContext>
      <FlexContainer justifyContent="center">
        <CustomMuiButton>Hiển Thị Tất Cả Sản Phẩm</CustomMuiButton>
      </FlexContainer>
    </Fragment>
  );
};

export default TabProducts;
