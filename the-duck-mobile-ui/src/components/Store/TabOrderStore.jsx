import styled from "@emotion/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";

const CustomTabList = styled(TabList)(({ theme }) => ({
  margin: "25px 0 0 0",
  textAlign: "left",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  width: "auto",
  fontSize: "14px",
  color: "#e03e3e",
}));
function TabOrderStore(props) {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <>
      <TabContext value={tab}>
        <Box>
          <CustomTabList onChange={handleChangeTab} centered>
            <CustomTab label="Tất cả" value="1" />
            <CustomTab label="Chờ xác nhận" value="2" />
            <CustomTab label="Chuẩn bị hàng" value="3" />
            <CustomTab label="Đang giao hàng" value="4" />
            <CustomTab label="Đã hoàn thành" value="5" />
            <CustomTab label="Đã huỷ" value="6" />
          </CustomTabList>
        </Box>
        <TabPanel value="1"></TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3"></TabPanel>
        <TabPanel value="4"></TabPanel>
        <TabPanel value="5"></TabPanel>
        <TabPanel value="6"></TabPanel>
      </TabContext>
    </>
  );
}

export default TabOrderStore;
