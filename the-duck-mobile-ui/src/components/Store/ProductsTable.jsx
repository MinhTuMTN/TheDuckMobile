import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Collapse,
  IconButton,
  Typography,
  TableBody,
  CardMedia,
  Stack,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import FormatCurrency from "../FormatCurrency";
import MuiTextField from "../MuiTextFeild";

const ButtonCustom = styled(Button)`
  border-radius: 0.7rem;
  padding: 0.6rem 1.2rem;
`;
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
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
              image={row.productImage}
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
                {row.productName}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: "#6c737f",
                  fontSize: "0.875rem",
                }}
              >
                {" "}
                Category {row.category}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <FormatCurrency amount={row.price} />
        </TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
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
              fullWidth
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
                  size="medium"
                  color="color5"
                  style={{
                    width: "40%",
                  }}
                  InputLabelProps={{
                    shrink: true,
                    disableUnderline: true,
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
                <ButtonCustom variant="text" color="color5">
                  Xoá sản phẩm
                </ButtonCustom>
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
    productName: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
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
              {items.slice(0, rowsPerPage).map((row) => (
                <Row key={row.id} row={row} />
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
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
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
