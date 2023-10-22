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
import React from "react";

import MuiTextFeild from "../components/MuiTextFeild";

const CartButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.color1.main,
  },
}));
function CartTotal(props) {
  return (
    <Grid container sx={{ marginTop: "1rem" }} spacing={3}>
      <Grid item xs={4} height={"100%"}>
        <Paper
          sx={{
            padding: "1rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" component="h2" mb={1}>
            Mã giảm giá
          </Typography>
          <Divider />
          <Typography variant="body1" component="p" mt={2} mb={2}>
            Bạn có mã giảm giá? Vui lòng nhập tại đây
          </Typography>
          <MuiTextFeild variant="outlined" />
          <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
            <Button
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
        </Paper>
      </Grid>
      <Grid item xs={8} height={"100%"}>
        <Paper sx={{ padding: "1rem", height: "100%" }}>
          <Typography variant="h5" component="h2" mb={1}>
            Tổng cộng
          </Typography>
          <Divider />
          <Grid container sx={{ marginTop: "1rem" }} spacing={3}>
            <Grid item xs={10}>
              <Typography
                variant="body1"
                component="p"
                textAlign={"end"}
                fontWeight={"bold"}
              >
                Tạm tính
              </Typography>
              <Typography
                variant="body1"
                component="p"
                textAlign={"end"}
                fontWeight={"bold"}
              >
                Phí vận chuyển
              </Typography>
              <Typography
                variant="body1"
                component="p"
                textAlign={"end"}
                fontWeight={"bold"}
              >
                Giảm giá
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" component="p" textAlign={"end"}>
                200.000 đ
              </Typography>
              <Typography variant="body1" component="p" textAlign={"end"}>
                20.000 đ
              </Typography>
              <Typography variant="body1" component="p" textAlign={"end"}>
                0 đ
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Stack direction={"row"} width={"100%"}>
            <Typography
              variant="h5"
              component="h2"
              textAlign={"end"}
              mt={1}
              flex={10}
              sx={{ color: "color4.main" }}
            >
              Tổng tiền (1 sản phẩm)
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              textAlign={"end"}
              fontWeight={"bold"}
              mt={1}
              flex={2}
              sx={{ color: "color1.main" }}
            >
              500.000 đ
            </Typography>
          </Stack>
          <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
            <CartButton
              variant="contained"
              sx={{
                marginTop: "1rem",
                textTransform: "none",
              }}
            >
              Thanh toán
            </CartButton>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CartTotal;
