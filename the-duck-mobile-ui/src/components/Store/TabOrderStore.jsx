import styled from "@emotion/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStoreOrder } from "../../services/Store/StoreOrderService";
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
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    orderState: 5,
  });
  const [count, setCount] = useState(0);

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
