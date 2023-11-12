import styled from "@emotion/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import ListOrder from "./ListOrder";

const CustomTabList = styled(TabList)(({ theme }) => ({
  borderBottom: "1px solid #e0e0e0",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  width: "auto",
  fontSize: "14px",
  color: "#6c737f",
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
          <CustomTabList onChange={handleChangeTab}>
            <CustomTab label="Tất cả" value="1" />
            <CustomTab label="Chờ xác nhận" value="2" />
            <CustomTab label="Chuẩn bị hàng" value="3" />
            <CustomTab label="Đang giao hàng" value="4" />
            <CustomTab label="Đã hoàn thành" value="5" />
            <CustomTab label="Đã huỷ" value="6" />
          </CustomTabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            paddingX: "0px",
          }}
        >
          <ListOrder />
        </TabPanel>
        <TabPanel value="2">Hello 2</TabPanel>
        <TabPanel value="3"></TabPanel>
        <TabPanel value="4"></TabPanel>
        <TabPanel value="5"></TabPanel>
        <TabPanel value="6"></TabPanel>
      </TabContext>
    </>
  );
}

export default TabOrderStore;
