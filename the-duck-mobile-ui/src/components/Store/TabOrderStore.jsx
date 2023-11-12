import styled from "@emotion/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ListOrder from "./ListOrder";

const CustomTabList = styled(TabList)(({ theme }) => ({
  borderBottom: "1px solid #e0e0e0",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  width: "auto",
  fontSize: "14px",
  color: "#6c737f",
}));

const items = [
  {
    id: "091be10cb",
    date: "2021-05-30",
    status: "Đã huỷ",
    total: 10000000,
  },
  {
    id: "091be10cb",
    date: "2021-11-10",

    status: "Đã hoàn thành",
    total: 1000000,
  },
  {
    id: "091be10cb",
    date: "2021-10-10",
    status: "Chờ xác nhận",
    total: 12200000,
  },
  {
    id: "vv1be10cb",
    date: "2021-12-12",
    status: "Đang giao hàng",
    total: 77000000,
  },
  {
    id: "294be10cb",
    date: "2021-11-11",
    status: "Đã hoàn thành",
    total: 56000000,
  },
  {
    id: "461be1bg2",
    date: "2021-10-10",
    status: "Đã hoàn thành",
    total: 33222000,
  },
];
function TabOrderStore(props) {
  const [tab, setTab] = useState("1");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Lọc mục dựa trên tab hiện tại
    switch (tab) {
      case "1":
        setFilteredItems(items); // Hiển thị tất cả các mục
        break;
      case "2":
        setFilteredItems(
          items.filter((item) => item.status === "Chờ xác nhận")
        );
        break;
      case "3":
        setFilteredItems(
          items.filter((item) => item.status === "Chuẩn bị hàng")
        );
        break;
      case "4":
        setFilteredItems(
          items.filter((item) => item.status === "Đang giao hàng")
        );
        break;
      case "5":
        setFilteredItems(
          items.filter((item) => item.status === "Đã hoàn thành")
        );
        break;
      case "6":
        setFilteredItems(items.filter((item) => item.status === "Đã huỷ"));
        break;
      default:
        setFilteredItems([]);
        break;
    }
  }, [tab]);

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
          <ListOrder items={items} />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            paddingX: "0px",
          }}
        >
          <ListOrder items={filteredItems} />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            paddingX: "0px",
          }}
        >
          <ListOrder items={filteredItems} />
        </TabPanel>
        <TabPanel
          value="4"
          sx={{
            paddingX: "0px",
          }}
        >
          <ListOrder items={filteredItems} />
        </TabPanel>
        <TabPanel
          value="5"
          sx={{
            paddingX: "0px",
          }}
        >
          <ListOrder items={filteredItems} />
        </TabPanel>
        <TabPanel
          value="6"
          sx={{
            paddingX: "0px",
          }}
        >
          <ListOrder items={filteredItems} />
        </TabPanel>
      </TabContext>
      <TablePagination
        component="div"
        count={items.length}
        onPageChange={() => {
          console.log("on page change");
        }}
        onRowsPerPageChange={() => {
          console.log("on row per page change");
        }}
        page={0}
        rowsPerPage={1}
        rowsPerPageOptions={[1]}
      />
    </>
  );
}

TabOrderStore.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
};

export default TabOrderStore;
