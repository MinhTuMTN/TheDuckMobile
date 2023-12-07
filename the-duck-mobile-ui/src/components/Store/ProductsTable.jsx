import styled from "@emotion/styled";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  CardMedia,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { UpdateStoreProductQuantity } from "../../services/Store/StoreProductService";
import FormatCurrency from "../FormatCurrency";
import MuiTextField from "../MuiTextFeild";
import ColorButton from "../ColorButton";

const ButtonCustom = styled(Button)`
  border-radius: 0.7rem;
  padding: 0.6rem 1.2rem;
`;
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(row?.quantity || 0);
  const [updateQuantity, setUpdateQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateQuantity = async () => {
    if (updateQuantity <= 0) return;

    const response = await UpdateStoreProductQuantity(row.storeProductId, {
      quantity: updateQuantity,
    });
    if (response.success) {
      enqueueSnackbar("Cập nhật số lượng thành công", { variant: "success" });
      setQuantity((prev) => parseInt(prev) + parseInt(updateQuantity));
    } else {
      enqueueSnackbar("Cập nhật số lượng thất bại", { variant: "error" });
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <CardMedia
              component="img"
              image={row.thumbnail}
              alt="Hình ảnh sản phẩm"
              style={{ maxHeight: "5rem", maxWidth: "5rem" }}
            />
            <Stack direction={"column"} spacing={0.5}>
              <Typography
                variant="subtitle1"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "300px", // Điều chỉnh chiều rộng tối đa
                }}
              >
                {row.productVersionName} - {row.productName}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: "#6c737f",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                {" "}
                Màu: {row.colorName} <ColorButton color={row.colorCode} />
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: "#6c737f",
                  fontSize: "0.875rem",
                }}
              >
                {" "}
                Category: {row.catalogName}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography>
            <FormatCurrency amount={row.price} />
          </Typography>
          <Typography>
            <FormatCurrency amount={row.promotionPrice} />
          </Typography>
        </TableCell>
        <TableCell align="right">{quantity}</TableCell>
        <TableCell align="right">
          {!row.isDeleted ? "Đang bán" : "Ngưng bán"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          sx={{
            borderLeft: "4px solid #d54949c3",
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                marginY: "1rem",
              }}
            >
              <Stack
                direction={"column"}
                spacing={0}
                sx={{
                  paddingX: "0rem",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "1rem",
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  marginBottom={1.5}
                >
                  Cập nhật số lượng sản phẩm
                </Typography>
                <MuiTextField
                  variant="filled"
                  label="Số lượng"
                  type="number"
                  error={updateQuantity <= 0}
                  helperText={
                    updateQuantity <= 0 ? "Số lượng không hợp lệ" : ""
                  }
                  size="medium"
                  style={{
                    width: "40%",
                  }}
                  color={"color4"}
                  value={updateQuantity}
                  onChange={(e) => setUpdateQuantity(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                marginTop={2}
              >
                <Stack direction={"row"} spacing={2}>
                  <ButtonCustom
                    onClick={handleUpdateQuantity}
                    disabled={updateQuantity <= 0}
                    variant="contained"
                    color="color1"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Cập nhật
                  </ButtonCustom>
                  <ButtonCustom
                    variant="text"
                    color="color4"
                    onClick={() => setOpen(!open)}
                  >
                    Huỷ
                  </ButtonCustom>
                </Stack>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    productName: PropTypes.string,
    productImage: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    status: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

function ProductsTable(props) {
  const { count, onPageChange, onRowsPerPageChange, page, rowsPerPage, items } =
    props;

  return (
    <>
      <Box paddingX={2}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                {/*<TableCell align="right">Category</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(0, rowsPerPage).map((row, index) => (
                <Row key={`row-${index}-${row.productVersionId}`} row={row} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[1, 5, 10, 25]}
      />
    </>
  );
}

ProductsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

export default ProductsTable;
