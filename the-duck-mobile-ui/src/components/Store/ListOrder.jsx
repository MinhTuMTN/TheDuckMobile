import { Box } from "@mui/material";
import React from "react";
import SearchSeller from "./SearchSeller";
import OrderItem from "./OrderItem";

function ListOrder(props) {
  return (
    <>
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "15px",
          marginBottom: 3,
          marginX: 5,
        }}
      >
        <SearchSeller borderRadius="15px" />
      </Box>

      <OrderItem status={"Chờ xác nhận"} />
      <OrderItem status={"Chuẩn bị hàng"} />
      <OrderItem status={"Đang giao hàng"} />
    </>
  );
}

export default ListOrder;
