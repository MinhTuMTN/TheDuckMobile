import { Stack } from "@mui/material";
import React from "react";
import OrderHistoryItem from "../components/OrderHistoryItem";

function OrderHistory(props) {
  return (
    <Stack direction={"column"} spacing={3}>
      <OrderHistoryItem />
      <OrderHistoryItem />
      <OrderHistoryItem />
      <OrderHistoryItem />
      <OrderHistoryItem />
    </Stack>
  );
}

export default OrderHistory;
