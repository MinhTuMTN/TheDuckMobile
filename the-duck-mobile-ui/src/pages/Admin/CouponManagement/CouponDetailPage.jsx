import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BasicDetailCoupon from "../../../components/Admin/BasicDetailCoupon";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getCouponById } from "../../../services/Admin/CouponService";


function CouponDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({});

  const handleGetCoupon = useCallback(async () => {
    const response = await getCouponById(state.id);
    if (response.success) {
      setCoupon(response.data.data);
    }
  }, [state.id]);

  useEffect(() => {
    handleGetCoupon();
  }, [handleGetCoupon]);

  return (
    <Box
      sx={{
        pt: 3,
        paddingBottom: 10,
        paddingX: 3,
        margin: "auto",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            marginBottom={3}
          >
            <IconButton
              aria-label="back"
              size="small"
              padding="0"
              margin="0"
              color="#111927"
              onClick={() => { navigate("/admin/coupon-management") }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight={600}
              style={{
                fontSize: "14px",
                color: "#111927",
              }}
            >
              Danh sách mã giảm giá
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Stack direction={"column"}>
                  <Typography
                    variant="h3"
                    fontWeight={600}
                    style={{
                      textTransform: "uppercase",
                      fontSize: ["1.5rem", "2rem"],
                    }}
                  >
                    Mã giảm giá "{coupon.couponCode}"
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <BasicDetailCoupon coupon={coupon} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CouponDetailPage;
