import styled from "@emotion/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import ListOrder from "./ListOrder";
import { getStoreOrder } from "../../services/Store/StoreOrderService";
import Loading from "../Loading";

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
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    orderState: 5,
  });
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeTab = (event, newTab) => {
    setPagination((prev) => ({
      ...prev,
      orderState: parseInt(newTab),
      page: 0,
    }));
  };

  useEffect(() => {
    const getOrders = async () => {
      const response = await getStoreOrder({
        page: pagination.page,
        limit: pagination.limit,
        orderState: pagination.orderState,
      });

      setIsLoading(true);
      if (response.success) {
        const result = response.data.data;
        setOrders(result.objects);
        setPagination((prev) => ({
          ...prev,
          page: result.page,
          limit: result.limit,
        }));
        setCount(result.totalObjects);
      } else console.log(response.message);
      setIsLoading(false);
    };
    getOrders();
  }, [pagination.page, pagination.limit, pagination.orderState]);

  return (
    <>
      <TabContext value={pagination.orderState.toString()}>
        <Box>
          <CustomTabList onChange={handleChangeTab}>
            <CustomTab label="Tất cả" value={"5"} />
            <CustomTab label="Chờ xác nhận" value={"0"} />
            <CustomTab label="Chuẩn bị hàng" value={"1"} />
            <CustomTab label="Đang giao hàng" value={"2"} />
            <CustomTab label="Đã hoàn thành" value={"3"} />
            <CustomTab label="Đã huỷ" value={"4"} />
          </CustomTabList>
        </Box>
        <TabPanel
          value={pagination.orderState.toString()}
          sx={{
            paddingX: "0px",
          }}
        >
          {count === 0 ? (
            <Typography variant="body1" textAlign={"center"} padding={4}>
              Không có đơn hàng nào để hiển thị
            </Typography>
          ) : (
            <ListOrder items={orders} />
          )}
        </TabPanel>
      </TabContext>
      <TablePagination
        component="div"
        count={count}
        onPageChange={(e, page) => setPagination((prev) => ({ ...prev, page }))}
        onRowsPerPageChange={(e) => {
          setPagination((prev) => ({
            ...prev,
            limit: parseInt(e.target.value),
            page: 0,
          }));
        }}
        page={pagination.page}
        rowsPerPage={pagination.limit}
        rowsPerPageOptions={[1, 5, 10, 25]}
      />
    </>
  );
}

export default TabOrderStore;
