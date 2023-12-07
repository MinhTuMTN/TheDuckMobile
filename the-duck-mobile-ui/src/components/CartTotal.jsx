import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import MuiTextFeild from "../components/MuiTextFeild";
import PropTypes from "prop-types";
import { getCoupon } from "../services/CouponService";
import { useSnackbar } from "notistack";
import FormatCurrency, { formatCurrency } from "./FormatCurrency";
import { useNavigate } from "react-router-dom";

const CartButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.color1.main,
  },
}));

CartTotal.propTypes = {
  selectedProducts: PropTypes.array,
  coupon: PropTypes.object,
  onCouponChange: PropTypes.func,
};

CartTotal.defaultProps = {
  selectedProducts: [],
  coupon: null,
  onCouponChange: () => { },
};

function CartTotal(props) {
  const { selectedProducts, coupon, onCouponChange, deleteDiscount, setDeleteDiscount } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [total, setTotal] = React.useState(0);
  const [couponCode, setCouponCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const shippingFee = 20000;
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteDiscount) {
      setDiscount(0);
    }
    let total = 0;
    selectedProducts.forEach((product) => {
      total +=
        Math.min(product.price, product.promotionPrice) * product.quantity;
    });
    setTotal(total);
  }, [selectedProducts, deleteDiscount]);

  const handleCheckCoupon = async () => {
    if (couponCode.trim() === "") {
      enqueueSnackbar("Vui lòng nhập mã giảm giá", { variant: "error" });
      return;
    }

    const response = await getCoupon(couponCode);
    if (response.error) {
      switch (response.statusCode) {
        case 411:
          enqueueSnackbar("Mã giảm giá không tồn tại", { variant: "error" });
          break;
        case 412:
          enqueueSnackbar("Mã giảm giá chưa thể dùng ở thời điểm này", {
            variant: "error",
          });
          break;
        case 413:
          enqueueSnackbar("Mã giảm giá đã hết hạn", { variant: "error" });
          break;
        case 414:
          enqueueSnackbar("Mã giảm giá đã hết lượt sử dụng", {
            variant: "error",
          });
          break;
        default:
          break;
      }
    } else {
      const couponData = response.data.data;
      if (couponData.minPrice > total) {
        const formattedMinPrice = formatCurrency(couponData.minPrice);
        enqueueSnackbar(
          `Mã giảm giá chỉ áp dụng cho đơn hàng từ ${formattedMinPrice}đ`,
          { variant: "error" }
        );
        return;
      }

      onCouponChange(couponData);
      enqueueSnackbar("Áp dụng mã giảm giá thành công", { variant: "success" });

      setDeleteDiscount(false);
      let discountPrice = Math.min(
        (total * couponData.discount) / 100,
        couponData.maxDiscount
      );
      setDiscount(discountPrice);
    }
  };

  return (
    <Grid
      container
      sx={{ marginTop: "1rem", width: "100%", marginLeft: "0px" }}
      gap={3}
      flexWrap={"nowrap"}
    >
      <Grid
        item
        xs={4}
        height={"100%"}
        padding={3}
        component={Paper}
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" component="h2" mb={1}>
          Mã giảm giá
        </Typography>
        <Divider />
        <Typography
          variant="body1"
          component="p"
          mt={2}
          mb={2}
          style={{ fontSize: "1rem" }}
        >
          Bạn có mã giảm giá? Vui lòng nhập tại đây
        </Typography>
        <MuiTextFeild
          variant="outlined"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
          <Button
            onClick={handleCheckCoupon}
            variant="contained"
            sx={{
              marginTop: "1rem",
              textTransform: "none",
              backgroundColor: "gray",
            }}
          >
            Áp dụng
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={8}
        height={"100%"}
        padding={3}
        component={Paper}
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" component="h2" mb={1}>
          Tổng cộng
        </Typography>
        <Divider />
        <Grid container sx={{ marginTop: "1rem" }} spacing={3}>
          <Grid item xs={8.5}>
            <Stack spacing={1.5}>
              <Typography
                variant="body1"
                component="p"
                textAlign={"end"}
                fontWeight={"bold"}
              >
                Tạm tính:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                textAlign={"end"}
                fontWeight={"bold"}
              >
                Phí vận chuyển:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                textAlign={"end"}
                fontWeight={"bold"}
              >
                Giảm giá:
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3.5}>
            <Stack spacing={1.5}>
              <Typography variant="body1" component="p" textAlign={"end"}>
                <FormatCurrency amount={total} />
              </Typography>
              <Typography variant="body1" component="p" textAlign={"end"}>
                <FormatCurrency amount={total === 0 ? 0 : shippingFee} />
              </Typography>
              <Typography variant="body1" component="p" textAlign={"end"}>
                <FormatCurrency amount={discount} />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Stack direction={"row"} width={"100%"}>
          <Typography
            variant="h5"
            component="h2"
            textAlign={"end"}
            mt={1}
            flex={8.5}
            sx={{ color: "color4.main" }}
          >
            Tổng tiền ({selectedProducts?.length} sản phẩm):
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            textAlign={"end"}
            fontWeight={"bold"}
            mt={1}
            flex={3.5}
            sx={{ color: "color1.main" }}
          >
            <FormatCurrency
              amount={total === 0 ? 0 : total + shippingFee - discount}
            />
          </Typography>
        </Stack>
        <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
          <CartButton
            disabled={total === 0}
            variant="contained"
            sx={{
              marginTop: "1rem",
              textTransform: "none",
            }}
            onClick={() => {
              if (total === 0) return;

              // Navigate with state
              navigate("/payment", {
                state: {
                  selectedProducts,
                  coupon,
                  total,
                  discount,
                  shippingFee,
                  couponCode,
                },
              });
            }}
          >
            Thanh toán
          </CartButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CartTotal;
