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
} from "@mui/material";
import React from "react";
import FormatCurrency from "../FormatCurrency";
import Loading from "../Loading";
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
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
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
        <Grid container alignItems={"center"} paddingBottom={1}>
          <Grid item xs={3}>
            <TieuDeCot>Trạng thái</TieuDeCot>
          </Grid>

          <Grid item xs={7.25}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                value={status}
                label="Trạng thái"
                onChange={handleChange}
                className="custom-select"
              >
                <MenuItem value={10} style={{ fontSize: "14px" }}>
                  Chờ xác nhận
                </MenuItem>
                <MenuItem value={20} style={{ fontSize: "14px" }}>
                  Đang giao hàng
                </MenuItem>
                <MenuItem value={30} style={{ fontSize: "14px" }}>
                  Đã giao hàng
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={1.75}
            display={"flex"}
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                padding: "auto",
                height: "100%",
                background: "#e37272",
                ":hover": {
                  background: "#e05656",
                  color: "#fff",
                },
              }}
            >
              Cập nhật
            </Button>
          </Grid>
        </Grid>
      </BoxStyle>
    </Stack>
  );
}

export default BasicDetails;
