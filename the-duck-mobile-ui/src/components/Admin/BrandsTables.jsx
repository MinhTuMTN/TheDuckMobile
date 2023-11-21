import React, { useEffect, useState } from "react";
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
import { enqueueSnackbar } from "notistack";
import { updateBrand } from "../../services/Admin/BrandService";

const ButtonCustom = styled(Button)`
  border-radius: 0.7rem;
  padding: 0.6rem 1.2rem;
`;
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [urlImage, setUrlImage] = useState("");
  const [brand, setBrand] = useState({
    brandName: "",
    image: null,
    isDeleted: false,
  });

  const handleImageChange = (event) => {
    setImageSelected(event.target.files[0])
  };

  useEffect(() => {
    if (imageSelected === null)
      return;
    const url = URL.createObjectURL(imageSelected);
    setUrlImage(url);
    setBrand((prev) => {
      return {
        ...prev,
        image: imageSelected,
      };
    });
    return () => URL.revokeObjectURL(url);
  }, [imageSelected]);

  const handleStatusChange = (event) => {
    setBrand((prev) => {
      return {
        ...prev,
        isDeleted: event.target.value
      };
    });
    console.log(brand.isDeleted);
  };

  useEffect(() => {
    setBrand((prev) => {
      return {
        ...prev,
        brandName: row.brandName,
        image: row.image,
        isDeleted: row.isDeleted
      };
    });
    setUrlImage(row.image);
  }, [row]);

  const handleEditBrand = async () => {
    const formData = new FormData();
    formData.append('brandName', brand.brandName);
    formData.append('image', brand.image);
    formData.append('isDeleted', brand.isDeleted);

    enqueueSnackbar("Đang cập nhật thông tin...", { variant: "info" });
    const response = await updateBrand(row.brandId, formData);

    if (response.success) {
      enqueueSnackbar("Chỉnh sửa thương hiệu thành công", { variant: "success" });
      window.location.reload();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = React.createRef();
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
              image={row.image}
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
        <TableCell align="right">{row.numberOfProducts}</TableCell>
        <TableCell align="right">{row.isDeleted ? "Khóa" : "Đang hoạt động"}</TableCell>
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
                fullWidth: true
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
                    image={urlImage}
                    alt="Hình ảnh sản phẩm"
                    style={{ maxHeight: "8rem", maxWidth: "8rem", cursor: 'pointer' }}
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <Stack direction={"column"} spacing={2} width={"100%"}>
                    <MuiTextField
                      label="Tên thương hiệu"
                      type="text"
                      size="medium"
                      value={brand.brandName}
                      onChange={(e) => {
                        setBrand((prev) => ({
                          ...prev,
                          brandName: e.target.value,
                        }));
                      }}
                      style={{
                        fullWidth: true,
                      }}
                    />
                    <FormControl
                      sx={{
                        fullWidth: true,
                      }}
                      size="small"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Trạng thái
                      </InputLabel>
                      <Select
                        value={brand.isDeleted}
                        label="Trạng thái"
                        onChange={handleStatusChange}
                      >
                        <MenuItem
                          value={false}
                          style={{ fontSize: "14px" }}
                          key="Đang hoạt động"
                        >
                          Đang hoạt động
                        </MenuItem>
                        <MenuItem
                          value={true}
                          style={{ fontSize: "14px" }}
                          key="Khóa"
                        >
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
                    onClick={handleEditBrand}
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
                {/* <ButtonCustom variant="text" color="color5">
                  Xoá thương hiệu
                </ButtonCustom> */}
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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
              {items.slice(0, rowsPerPage).map((row, index) => (
                <Row key={index} row={row} />
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
