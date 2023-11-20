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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import MuiTextField from "../MuiTextFeild";

const ButtonCustom = styled(Button)`
  border-radius: 0.7rem;
  padding: 0.6rem 1.2rem;
`;
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(10);
  const handleChange = (event) => {
    setStatus(event.target.value);
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
              image={row.brandImage}
              alt="Hình ảnh sản phẩm"
              style={{ maxHeight: "5rem", maxWidth: "5rem" }}
            />
            <Typography
              variant="subtitle1"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "300px",
              }}
            >
              {row.brandName}
            </Typography>
          </Stack>
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
                  style={{
                    fontSize: "1rem",
                  }}
                  marginBottom={1.5}
                >
                  Cập nhật thông tin
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  sx={{
                    fullWidth: true,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={row.brandImage}
                    alt="Hình ảnh sản phẩm"
                    style={{ maxHeight: "8rem", maxWidth: "8rem" }}
                  />
                  <Stack direction={"column"} spacing={2} width={"100%"}>
                    <MuiTextField
                      variant="filled"
                      label="Tên thương hiệu"
                      type="text"
                      size="medium"
                      color="color5"
                      value={row.brandName}
                      style={{
                        fullWidth: true,
                      }}
                    />
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Trạng thái
                      </InputLabel>
                      <Select
                        value={row.status}
                        label="Trạng thái"
                        onChange={handleChange}
                      >
                        <MenuItem
                          value={"Đang hoạt động"}
                          style={{ fontSize: "14px" }}
                        >
                          Đang hoạt động
                        </MenuItem>
                        <MenuItem value={"Khoá"} style={{ fontSize: "14px" }}>
                          Khóa
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
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
                  Xoá thương hiệu
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
    brandName: PropTypes.string.isRequired,
    brandImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

function BrandsTable(props) {
  const { count, onPageChange, onRowsPerPageChange, page, rowsPerPage, items } =
    props;

  return (
    <>
      <Box paddingX={2} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "5%" }} />
                <TableCell style={{ width: "40%" }}>Thương hiệu</TableCell>
                <TableCell style={{ width: "35%" }} align="right">
                  Số sản phẩm
                </TableCell>
                <TableCell style={{ width: "20%" }} align="right">
                  Trạng thái
                </TableCell>
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

BrandsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

export default BrandsTable;
