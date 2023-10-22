import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ColorButton from "../components/ColorButton";
import styled from "@emotion/styled";

import MuiTextFeild from "../components/MuiTextFeild";

const DeleteButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.error.main,
  },
}));

const CartButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.color1.main,
  },
}));

function Cart(props) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      mt={10}
      mb={10}
    >
      <Stack sx={{ width: "80%" }} mt={10}>
        <Typography variant="h4" component="h1">
          Giỏ hàng của bạn
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Tên sản phẩm</TableCell>
                <TableCell align="center">Hình ảnh</TableCell>
                <TableCell align="right">Đơn giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="right">Thành tiền</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontWeight: "bold" }}
                  >
                    Điện thoại Samsung Galaxy S23 Ultra
                  </Typography>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="body2" component="p">
                      Màu: Đen
                    </Typography>
                    <ColorButton color="black" width="1rem" height="1rem" />
                  </Stack>
                  <Typography
                    variant="subtitle1"
                    color="gray"
                    sx={{ fontWeight: "none" }}
                    component="p"
                  >
                    Bộ nhớ: 128GB
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <img
                    src="https://picsum.photos/200/300"
                    alt="product"
                    width="100"
                  />
                </TableCell>
                <TableCell align="right">500.000 đ</TableCell>
                <TableCell align="center">
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                    width={"100%"}
                  >
                    <IconButton size="large" aria-label="minus">
                      -
                    </IconButton>
                    <Typography variant="body1" component="p">
                      1
                    </Typography>
                    <IconButton size="large" aria-label="plus">
                      +
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell align="right">500.000 đ</TableCell>
                <TableCell align="center">
                  <DeleteButton aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

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
      </Stack>
    </Box>
  );
}

export default Cart;
