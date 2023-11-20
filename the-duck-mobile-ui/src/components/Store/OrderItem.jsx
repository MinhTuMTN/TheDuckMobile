import { Box, Chip, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import FormatCurrency from "../FormatCurrency";
OrderItem.propTypes = {
  order: PropTypes.object,
};
function OrderItem(props) {
  const { order, handleClick } = props;
  const statusColors = {
    "Chờ xác nhận": "primary",
    "Chuẩn bị hàng": "info",
    "Đang giao hàng": "warning",
    "Đã hoàn thành": "success",
    "Đã huỷ": "error",
  };
  const options = { month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(order.createdAt)
  );

  switch (order.orderState) {
    case 0:
      order.orderState = "Chờ xác nhận";
      break;
    case 1:
      order.orderState = "Chuẩn bị hàng";
      break;
    case 2:
      order.orderState = "Đang giao hàng";
      break;
    case 3:
      order.orderState = "Đã hoàn thành";
      break;
    case 4:
      order.orderState = "Đã huỷ";
      break;
    default:
      break;
  }

  // Màu sắc của Chip dựa trên giá trị status
  const chipColor = statusColors[order.orderState] || "default";

  return (
    <Stack
      direction={"row"}
      sx={{
        border: "1px solid #e0e0e0",
        paddingY: 2,
        paddingX: 5,
        alignItems: "center",
        cursor: "pointer",
      }}
      justifyContent={"space-between"}
      onClick={() => {
        handleClick();
      }}
    >
      <Stack spacing={2} direction={"row"}>
        <Box
          sx={{
            display: "flex",
            height: "55px",
            width: "50px",
            borderRadius: "16px",
            backgroundColor: "#e5e7eb",
            padding: "5px",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={"600"}
            style={{ fontSize: "15px", color: "#374151" }}
          >
            {formattedDate}
          </Typography>
        </Box>
        <Stack direction={"column"} spacing={0.2}>
          <Typography
            variant="body1"
            fontWeight={"600"}
            style={{
              fontSize: "16px",
              color: "#374151",
              textTransform: "uppercase",
            }}
          >
            Đơn hàng {order.orderId}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"300"}
            style={{
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            Tổng đơn hàng: <FormatCurrency amount={order.total} />
          </Typography>
        </Stack>
      </Stack>
      <Box width={"auto"}>
        <Chip color={chipColor} label={order.orderState} />
      </Box>
    </Stack>
  );
}

export default OrderItem;
