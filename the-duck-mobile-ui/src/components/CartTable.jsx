import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorButton from "./ColorButton";
import styled from "@emotion/styled";

const DeleteButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.error.main,
  },
}));

function CartTable(props) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "1rem" }} elevation={3}>
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
  );
}

export default CartTable;
