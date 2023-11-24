import styled from "@emotion/styled";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FormatCurrency from "../FormatCurrency";
import {
  cancelStoreOrder,
  confirmDelivered,
  confirmDelivery,
  confirmStoreOrder,
} from "../../services/Store/StoreOrderService";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import DialogForm from "../DialogForm";

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

function BasicDetails(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    var options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return d.toLocaleDateString("vi-VN", options);
  };

  const handleConfirm = async () => {
    const response = await confirmStoreOrder(order.orderId);
    if (response.success) {
      enqueueSnackbar("Xác nhận đơn hàng thành công", { variant: "success" });
      navigate(0);
    } else {
      enqueueSnackbar("Xác nhận đơn hàng thất bại", { variant: "error" });
    }
  };

  const handleConfirmDelivery = async () => {
    const response = await confirmDelivery(order.orderId);
    if (response.success) {
      enqueueSnackbar("Xác nhận đang giao hàng thành công", {
        variant: "success",
      });
      navigate(0);
    } else {
      enqueueSnackbar("Xác nhận giao hàng thất bại", { variant: "error" });
    }
  };

  const handleConfirmDelivered = async () => {
    const response = await confirmDelivered(order.orderId);
    if (response.success) {
      enqueueSnackbar("Xác nhận đã giao hàng thành công", {
        variant: "success",
      });
      navigate(0);
    } else {
      enqueueSnackbar("Xác nhận giao hàng thất bại", { variant: "error" });
    }
  };

  const handleCancel = async () => {
    const response = await cancelStoreOrder(order.orderId);
    if (response.success) {
      enqueueSnackbar("Hủy đơn hàng thành công", { variant: "success" });
      navigate(0);
    } else {
      enqueueSnackbar("Hủy đơn hàng thất bại", { variant: "error" });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusOptions = {
    0: {
      label: "Đang chờ xác nhận",
      action: "Xác nhận",
      handle: handleConfirm,
    },
    1: {
      label: "Đang xử lý đơn hàng",
      action: "Giao hàng",
      handle: handleConfirmDelivery,
    },
    2: {
      label: "Đang giao hàng",
      action: "Hoàn thành",
      handle: handleConfirmDelivered,
    },
    3: {
      label: "Đã hoàn thành",
      action: "",
      handle: () => {},
    },
    4: {
      label: "Đã hủy",
      action: "",
      handle: () => {},
    },
  };
  return (
    <>
      <Stack
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
                <TieuDeCot>{order?.customer?.customerName}</TieuDeCot>
                <TieuDeCot>{order?.customer?.phoneNumber}</TieuDeCot>
                <NoiDung>{`${order?.customer?.customerAddress?.street}, ${order?.customer?.customerAddress?.wardName}`}</NoiDung>
                <NoiDung>
                  {order?.customer?.customerAddress?.districtName}
                </NoiDung>
                <NoiDung>
                  {order?.customer?.customerAddress?.provinceName}
                </NoiDung>
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
              <NoiDung>{formatDate(order?.createdAt)}</NoiDung>
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
                {order?.couponCode ? order?.couponCode : "Không có"}
              </NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={3}>
              <TieuDeCot>Giảm giá</TieuDeCot>
            </Grid>

            <Grid item xs={9}>
              <NoiDung
                sx={{
                  textTransform: "uppercase",
                }}
              >
                <FormatCurrency amount={order?.discount} />
              </NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={3}>
              <TieuDeCot>Phí vận chuyển</TieuDeCot>
            </Grid>

            <Grid item xs={9}>
              <NoiDung
                sx={{
                  textTransform: "uppercase",
                }}
              >
                <FormatCurrency amount={order?.shippingFee} />
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
                <FormatCurrency amount={order?.total} />
              </NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container alignItems={"center"} paddingBottom={1}>
            <Grid item xs={3}>
              <TieuDeCot>Trạng thái</TieuDeCot>
            </Grid>

            <Grid item xs={5.5}>
              <NoiDung>{statusOptions[order?.orderState]?.label}</NoiDung>
            </Grid>
            <Grid
              item
              xs={3.5}
              display={"flex"}
              sx={{
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  maxHeight: "3rem",
                  display: statusOptions[order?.orderState]?.action
                    ? ""
                    : "none",
                  background: "#e37272",
                  marginRight: "1rem",
                  ":hover": {
                    background: "#e05656",
                    color: "#fff",
                  },
                }}
                onClick={statusOptions[order?.orderState]?.handle}
              >
                {statusOptions[order?.orderState]?.action}
              </Button>
              <Button
                disabled={order?.orderState === 4 || order?.orderState === 3}
                variant="contained"
                size="large"
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  maxHeight: "3rem",
                  background: "#e37272",
                  ":hover": {
                    background: "#e05656",
                    color: "#fff",
                  },
                }}
              >
                Hủy đơn hàng
              </Button>
            </Grid>
          </Grid>
        </BoxStyle>
      </Stack>
      <DialogForm
        open={open}
        onClose={handleClose}
        title={"Hủy đơn hàng"}
        cancelText={"Hủy"}
        onCancel={handleClose}
        okText={"Xác nhận hủy đơn hàng"}
        content={"Bạn có chắc chắn muốn hủy đơn hàng này?"}
        onOk={handleCancel}
      />
    </>
  );
}

export default BasicDetails;
