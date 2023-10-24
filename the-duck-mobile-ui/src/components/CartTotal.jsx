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
          <Grid item xs={9.5}>
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
          <Grid item xs={2.5}>
            <Stack spacing={1.5}>
              <Typography variant="body1" component="p" textAlign={"end"}>
                200.000 đ
              </Typography>
              <Typography variant="body1" component="p" textAlign={"end"}>
                20.000 đ
              </Typography>
              <Typography variant="body1" component="p" textAlign={"end"}>
                0 đ
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
            flex={9.5}
            sx={{ color: "color4.main" }}
          >
            Tổng tiền (1 sản phẩm):
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            textAlign={"end"}
            fontWeight={"bold"}
            mt={1}
            flex={2.5}
            sx={{ color: "color1.main" }}
          >
            70.500.000 đ
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
      </Grid>
    </Grid>
  );
}

export default CartTotal;
