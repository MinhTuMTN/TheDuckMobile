import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { FormEditCatalog } from "../../pages/Admin/CatalogManagement/EditCatalogPage";
import { DeleteOutline } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import {
  addCatalogBrand,
  deleteCatalogBrand,
  getCatalogBrands,
} from "../../services/Admin/CatalogService";

function Brands(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [availableBrands, setAvailableBrands] =
    React.useState([]);
  const [notAvailableBrands, setNotAvailableBrands] =
    React.useState([]);
  const [selectedBrand, setSelectedBrand] =
    React.useState(-1);
  const handleGetBrands = useCallback(async () => {
    if (!props.catalogId) return;
    const response = await getCatalogBrands(props.catalogId);
    if (response.success) {
      setAvailableBrands(
        response.data.data.availableBrands
      );
      setNotAvailableBrands(
        response.data.data.notAvailableBrands
      );
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [enqueueSnackbar, props.catalogId]);

  useEffect(() => {
    handleGetBrands();
  }, [handleGetBrands]);

  const handleAddBrand = async () => {
    if (selectedBrand === -1) return;
    const response = await addCatalogBrand(
      props.catalogId,
      selectedBrand
    );
    if (response.success) {
      enqueueSnackbar("Thêm thương hiệu thành công", {
        variant: "success",
      });
      handleGetBrands();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleDeleteBrand = async (brandId) => {
    const response = await deleteCatalogBrand(
      props.catalogId,
      brandId
    );
    if (response.success) {
      enqueueSnackbar("Xóa thương hiệu thành công", {
        variant: "success",
      });
      handleGetBrands();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };
  return (
    <FormEditCatalog>
      <Typography variant="h5">Thương hiệu</Typography>
      <Typography variant="subtitle1" mt={2} mb={1}>
        Thêm thương hiệu
      </Typography>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <FormControl
          sx={{
            width: "100%",
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={selectedBrand === -1 ? "" : selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            sx={{
              borderRadius: "10px !important",
              boxShadow: "0px 0px 5px 0px #3f3b3b1a",
              height: "40px",
              fontSize: "14px !important",
            }}
          >
            {notAvailableBrands?.map((item, index) => (
              <MenuItem
                key={`not-available-brand-${index}`}
                value={item.brandId}
                sx={{
                  fontSize: "14px !important",
                }}
              >
                {item.brandName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            fontSize: "14px !important",
            fontWeight: "500 !important",
            whiteSpace: "nowrap", // Thêm vào đây
          }}
          onClick={handleAddBrand}
        >
          Thêm mới
        </Button>
      </Stack>
      <Typography variant="subtitle1" mt={2} mb={1}>
        Danh sách thương hiệu
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"85%"}>
              <Typography variant="subtitle1">Tên thương hiệu</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Thao tác</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availableBrands?.map((item, index) => (
            <TableRow key={`available-brand-${index}`}>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.brandName}
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <IconButton
                  color="color1"
                  onClick={() => {
                    handleDeleteBrand(item.brandId);
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FormEditCatalog>
  );
}

export default Brands;
