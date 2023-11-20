import styled from "@emotion/styled";
import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FormatCurrency from "../FormatCurrency";
const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "500 !important",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "400 !important",
}));

function OrderDetails(props) {
  const { order } = props;

  const statusColors = {
    "Chờ xác nhận": "primary",
    "Chuẩn bị hàng": "info",
    "Đang giao hàng": "warning",
    "Đã hoàn thành": "success",
    "Đã huỷ": "error",
  };


  switch (order.orderState) {
    case "Pending":
      order.orderState = "Chờ xác nhận";
      break;
    case "Processing":
      order.orderState = "Chuẩn bị hàng";
      break;
    case "Delivering":
      order.orderState = "Đang giao hàng";
      break;
    case "Delivered":
      order.orderState = "Đã hoàn thành";
      break;
    case "Canceled":
      order.orderState = "Đã huỷ";
      break;
    default:
      break;
  }

  const chipColor = statusColors[order.orderState] || "default";
  // const chipColor = statusColors["Chờ xác nhận"] || "default";
  return (
    <Stack
      d
      sx={{
        borderRadius: "15px",
        paddingTop: 2,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin cơ bản</TieuDe>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={3}>
            <TieuDeCot>Thông tin khách hàng</TieuDeCot>
          </Grid>
          <Grid item xs={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{order.customer?.customerName}</TieuDeCot>
              <NoiDung>0123456789</NoiDung>
              <NoiDung>4 Nguyễn Khuyến, Phường 1, Quận Gò Vấp, TP.HCM</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={3}>
            <TieuDeCot>Thông tin nhân viên</TieuDeCot>
          </Grid>
          <Grid item xs={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>Nguyễn Văn A</TieuDeCot>
              <NoiDung>0987654321</NoiDung>
              <NoiDung>4 Nguyễn Khuyến, Phường 1, Quận Gò Vấp, TP.HCM</NoiDung>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={3}>
            <TieuDeCot>Ngày đặt</TieuDeCot>
          </Grid>

          <Grid item xs={9}>
            <NoiDung>12/10/2022 10:20</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={3}>
            <TieuDeCot>Mã giảm giá</TieuDeCot>
          </Grid>

          <Grid item xs={9}>
            <NoiDung
              sx={{
                textTransform: "uppercase",
              }}
            >
              promo1
            </NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={3}>
            <TieuDeCot>Tổng tiền</TieuDeCot>
          </Grid>
          <Grid item xs={9}>
            <NoiDung>
              <FormatCurrency amount={10000000} />
            </NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={3}>
            <TieuDeCot>Trạng thái</TieuDeCot>
          </Grid>
          <Grid item xs={9}>
            <NoiDung>
            <Chip color={chipColor} label={"Chờ xác nhận"} />
            </NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default OrderDetails;
