import { Box, Pagination, Stack } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import OrderHistoryItem from "../components/OrderHistoryItem";
import { getUserOrders } from "../services/OrderService";

function OrderHistory(props) {
  const [orders, setOrders] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 5,
    totalPages: 1,
  });
  const handleGetOrders = useCallback(async () => {
    const response = await getUserOrders(
      pagination?.page - 1,
      pagination?.limit
    );
    if (response.success) {
      setOrders(response.data.data.objects);
      setPagination({
        page: response.data.data.page + 1,
        limit: response.data.data.limit,
        totalPages: response.data.data.totalPages,
      });
    }
  }, [pagination?.limit, pagination?.page]);

  useEffect(() => {
    handleGetOrders();
  }, [handleGetOrders]);
  return (
    <Box>
      <Stack direction={"column"} spacing={3}>
        {orders.map((order) => (
          <OrderHistoryItem key={order.OrderId} order={order} />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={(event, value) => {
            setPagination({ ...pagination, page: value });
          }}
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
}

export default OrderHistory;
