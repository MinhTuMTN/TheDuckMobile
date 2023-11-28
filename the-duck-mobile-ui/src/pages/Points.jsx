import {
  Button,
  Card,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import MuiTextFeild from "../components/MuiTextFeild";
import DialogConfirm from "../components/DialogConfirm";
import { useSnackbar } from "notistack";
import { exchangeCoupon, getCustomerCoupons } from "../services/CouponService";
import logo from "../assets/logo.jpg";
import FormatCurrency from "../components/FormatCurrency";

function CouponItem(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { coupon } = props;

  const formatedDate = new Date(coupon.endDate).toLocaleDateString("vn");
  return (
    <Card
      style={{
        borderRadius: "25px",
        marginBottom: "1rem",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={1.5} p={1}>
          <CardMedia
            component="img"
            height="100%"
            image={logo}
            alt="green iguana"
            style={{
              objectFit: "contain",
              maxWidth: "6rem",
              maxHeight: "6rem",
              padding: "1rem",
              borderRadius: "25px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Stack padding={2}>
            <Typography variant="body1" fontWeight={"bold"}>
              The Duck Mobile
            </Typography>
            <Typography variant="body1">
              Mã giảm giá: <FormatCurrency amount={coupon.maxDiscount} />
            </Typography>
            <Typography variant="body1">
              Ngày hết hạn: {formatedDate}
            </Typography>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          display={"flex"}
          justifyContent={"space-around"}
          mb={2}
        >
          <MuiTextFeild
            value={coupon.couponCode}
            sx={{
              width: "82%",
            }}
            size={"small"}
            disabled
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              navigator.clipboard.writeText(coupon.couponCode);
              enqueueSnackbar("Đã sao chép mã giảm giá", {
                variant: "success",
              });
            }}
          >
            Sao chép
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

function Points(props) {
  const [point, setPoint] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [exchangePoints, setExchangePoints] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [coupons, setCoupons] = React.useState([]);

  const handleGetCustomerCoupons = useCallback(async () => {
    const response = await getCustomerCoupons();
    if (response.success) {
      setCoupons(response.data.data.coupons);
      setPoint(response.data.data.point);
    }
  }, [setCoupons, setPoint]);

  useEffect(() => {
    handleGetCustomerCoupons();
  }, [handleGetCustomerCoupons]);

  const handleExchangePoint = async () => {
    const response = await exchangeCoupon(
      parseInt(exchangePoints.replace(/,/g, ""))
    );
    if (response.success) {
      enqueueSnackbar("Đổi điểm tích lũy thành công", { variant: "success" });
      setOpen(false);
      setExchangePoints("");
      handleGetCustomerCoupons();
    } else {
      enqueueSnackbar("Đổi điểm tích lũy thất bại", { variant: "error" });
    }
  };

  const handleClick = () => {
    if (exchangePoints === "") {
      enqueueSnackbar("Vui lòng nhập số điểm cần đổi", { variant: "error" });
      return;
    }

    if (parseInt(exchangePoints.replace(/,/g, "")) > point) {
      enqueueSnackbar("Số điểm tích lũy không đủ", { variant: "error" });
      return;
    }
    setOpen(true);
  };
  return (
    <Stack>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Điểm tích lũy
      </Typography>

      <Typography variant="body1" mt={2}>
        Số điểm tích lũy hiện tại của bạn là: {point.toLocaleString("vn")} điểm
      </Typography>

      <Stack mt={2}>
        <Typography variant="body1" mt={2} fontWeight={"bold"}>
          Qui đổi điểm tích lũy: (1 điểm = 1 VNĐ)
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9}>
            <MuiTextFeild
              fullWidth
              size={"small"}
              value={exchangePoints}
              onChange={(e) => {
                let nums = e.target.value.replace(/,/g, "");
                if (nums === "") nums = "0";
                if (!nums || nums.endsWith(".")) return;
                const value = parseFloat(nums).toLocaleString("vn");
                setExchangePoints(value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
            >
              Qui đổi
            </Button>
          </Grid>
        </Grid>
      </Stack>

      <Stack mt={2}>
        <Typography variant="body1" mt={2} fontWeight={"bold"}>
          Phiếu giảm giá của bạn:
        </Typography>
        <Stack mt={2}>
          {coupons.map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} />
          ))}
        </Stack>
      </Stack>

      <DialogConfirm
        open={open}
        cancelText={"Hủy"}
        content={`Bạn có chắc chắn muốn đổi ${exchangePoints} điểm tích lũy thành phiếu giảm giá ${parseInt(
          exchangePoints.replace(/,/g, "")
        ).toLocaleString("vn")} đ không?`}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        okText={"Qui đổi"}
        onOk={handleExchangePoint}
        title={"Qui đổi điểm tích lũy"}
      />
    </Stack>
  );
}

export default Points;
