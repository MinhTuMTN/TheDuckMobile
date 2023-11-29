import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import {
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
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import ColorButton from "./ColorButton";
import FormatCurrency from "./FormatCurrency";
import Checkbox from "@mui/material/Checkbox";

const DeleteButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.error.main,
  },
}));

CartTable.propTypes = {
  products: PropTypes.array,
  onProductCartChange: PropTypes.func,
  selectedProducts: PropTypes.array,
  onSelectProduct: PropTypes.func,
};

CartTable.defaultProps = {
  products: [],
  onProductCartChange: () => {},
  selectedProducts: [],
  onSelectProduct: () => {},
};

function CartTable(props) {
  const { products, onProductCartChange, selectedProducts, onSelectProduct } =
    props;
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ marginTop: "1rem" }} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Tên sản phẩm</TableCell>
            <TableCell align="center">Hình ảnh</TableCell>
            <TableCell align="right">Đơn giá</TableCell>
            <TableCell align="center">Số lượng</TableCell>
            <TableCell align="right">Thành tiền</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography
                  variant="body1"
                  component="p"
                  padding={5}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <HighlightOffRoundedIcon
                    style={{
                      marginRight: 5,
                    }}
                  />
                  Không có sản phẩm nào trong giỏ hàng
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {products?.map((product) => (
            <TableRow key={`product-cart-${product?.productVersionId}`}>
              <TableCell>
                <Checkbox
                  color="color1"
                  disabled={
                    product?.quantity === 0 ||
                    product.quantity > product.maxQuantity
                  }
                  checked={selectedProducts.includes(product)}
                  onChange={() => onSelectProduct(product)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => navigate(`/product?id=${product?.productId}`)}
                >
                  {product?.productName}
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="body2" component="p">
                    Màu: {product?.colorName}
                  </Typography>
                  <ColorButton
                    color={product?.colorCode}
                    width="1rem"
                    height="1rem"
                  />
                </Stack>
                <Typography
                  variant="subtitle1"
                  color="gray"
                  sx={{ fontWeight: "none" }}
                  component="p"
                >
                  Phân loại: {product?.versionName}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <img src={product?.thumbnail} alt="product" width="100" />
              </TableCell>
              <TableCell align="right">
                {product?.promotionPrice > 0 &&
                  product?.promotionPrice < product?.price && (
                    <Typography
                      variant="subtitle1"
                      component="p"
                      sx={{ textDecoration: "line-through" }}
                      color={"color4.main"}
                    >
                      <FormatCurrency amount={product?.price} />
                    </Typography>
                  )}
                <Typography variant="body1" component="p" color={"color1.main"}>
                  <FormatCurrency
                    amount={Math.min(product?.price, product?.promotionPrice)}
                  />
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Stack direction={"column"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                    width={"100%"}
                  >
                    <IconButton
                      size="large"
                      aria-label="minus"
                      sx={{
                        cursor: `${
                          product?.quantity === 1 ? "not-allowed" : "pointer"
                        }`,
                      }}
                      onClick={() => {
                        onProductCartChange(
                          products.map((p) => {
                            if (
                              p.productVersionId === product.productVersionId
                            ) {
                              p.quantity = Math.max(1, p.quantity - 1);
                            }
                            return p;
                          })
                        );
                      }}
                    >
                      -
                    </IconButton>
                    <Typography variant="body1" component="p">
                      {product?.quantity}
                    </Typography>
                    <IconButton
                      size="large"
                      aria-label="plus"
                      onClick={() => {
                        onProductCartChange(
                          products.map((p) => {
                            if (
                              p.productVersionId === product.productVersionId &&
                              p.quantity < p.maxQuantity
                            ) {
                              p.quantity = Math.max(1, p.quantity + 1);
                            }
                            return p;
                          })
                        );
                      }}
                    >
                      +
                    </IconButton>
                  </Stack>
                  {product?.quantity >= product?.maxQuantity && (
                    <Typography
                      variant="body2"
                      component="p"
                      color={"color1.main"}
                      style={{
                        fontSize: ".9rem",
                      }}
                    >
                      Tối đa: {product?.maxQuantity} sản phẩm
                    </Typography>
                  )}
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" component="p" color={"color1.main"}>
                  <FormatCurrency
                    amount={
                      Math.min(product?.price, product?.promotionPrice) *
                      product?.quantity
                    }
                  />
                </Typography>
              </TableCell>
              <TableCell align="center">
                <DeleteButton
                  aria-label="delete"
                  size="large"
                  onClick={() => {
                    onProductCartChange(
                      products.filter(
                        (p) => p.productVersionId !== product.productVersionId
                      )
                    );
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable;
