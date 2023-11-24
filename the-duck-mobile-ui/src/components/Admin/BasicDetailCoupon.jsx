import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormatDate from "../FormatDate";
import { enqueueSnackbar } from "notistack";
import DialogConfirm from "../DialogConfirm";
import { deleteCoupon, restoreCoupon } from "../../services/Admin/CouponService";
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
  fontWeight: "720 !important",
  width: "100%",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "520 !important",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "400 !important",
}));

function BasicDetailCoupon(props) {
  const { coupon } = props;
  let status = coupon.isDeleted ? 1 : 0;
  const [editStatus, setEditStatus] = useState(0);
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    setEditStatus(status);
  }, [status]);

  const handleChange = (event) => {
    setEditStatus(event.target.value);
    setDisabledButton(false);
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleUpdateButtonClick = async () => {
    let response;
    if (editStatus === 0) {
      response = await restoreCoupon(coupon.couponId);
      if (response.success) {
        enqueueSnackbar("Mở khóa mã giảm giá thành công!", { variant: "success" });
        setDisabledButton(true);
      } else {
        enqueueSnackbar("Mở khóa mã giảm giá thất bại!", { variant: "error" });
      }
    } else {
      response = await deleteCoupon(coupon.couponId);
      if (response.success) {
        enqueueSnackbar("Khóa mã giảm giá thành công!", { variant: "success" });
        setDisabledButton(true);
      } else {
        enqueueSnackbar("Khóa mã giảm giá thất bại!", { variant: "error" });
      }
    }
  };

  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Thông tin chi tiết mã giảm giá</TieuDe>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Mã giảm giá</TieuDeCot>
          </Grid>
          <Grid item xs={8} md={9}>
            <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
              <TieuDeCot>{coupon.couponCode}</TieuDeCot>
            </Stack>
          </Grid>
        </Grid>
      </BoxStyle>

      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Giảm giá</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{coupon.discount}%</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Đơn tối thiểu</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung><FormatCurrency amount={coupon.minPrice} /></NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Giảm giá tối đa</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
          <NoiDung><FormatCurrency amount={coupon.maxDiscount} /></NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Số lượng tối đa</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{coupon.maxUse}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Số lượng đã được áp dụng</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung>{coupon.currentUse}</NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày bắt đầu</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung><FormatDate dateTime={coupon.startDate} /></NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Ngày kết thúc</TieuDeCot>
          </Grid>

          <Grid item xs={8} md={9}>
            <NoiDung><FormatDate dateTime={coupon.endDate} /></NoiDung>
          </Grid>
        </Grid>
      </BoxStyle>
      <BoxStyle>
        <Grid container alignItems={"center"} paddingBottom={1}>
          <Grid item xs={4} md={3}>
            <TieuDeCot>Trạng thái</TieuDeCot>
          </Grid>

          <Grid item xs={5} md={7.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                value={editStatus}
                label="Trạng thái"
                onChange={handleChange}
                className="custom-select"
              >
                <MenuItem
                  value={0}
                  style={{ fontSize: "14px" }}
                >
                  Đang hoạt động
                </MenuItem>
                <MenuItem
                  value={1}
                  style={{ fontSize: "14px" }}
                >
                  Đã khóa
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={3}
            md={1.5}
            display={"flex"}
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size={isSmallScreen ? "small" : "large"}
              sx={{
                padding: "auto",
                height: "100%",
                background: "#e37272",
                ":hover": {
                  background: "#e05656",
                  color: "#fff",
                },
              }}
              disabled={disabledButton}
              onClick={(e) => {
                setDeleteDialog(true);
              }}
            >
              Cập nhật
            </Button>
            <DialogConfirm
              open={deleteDialog}
              title={coupon.isDeleted ? "Mở khóa mã giảm giá" : "Khóa mã giảm giá"}
              content={
                coupon.isDeleted
                  ? "Bạn có chắc chắn muốn mở khóa mã giảm giá này?"
                  : "Bạn có chắc chắn muốn khóa mã giảm giá này?"
              }
              okText={coupon.isDeleted ? "Khôi phục" : "Xóa"}
              cancelText={"Hủy"}
              onOk={handleUpdateButtonClick}
              onCancel={() => setDeleteDialog(false)}
              onClose={() => setDeleteDialog(false)}
            />
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default BasicDetailCoupon;
