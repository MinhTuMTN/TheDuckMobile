import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import {
  addProductSpecialFeatures,
  deleteProductSpecialFeatures,
  getProductSpecialFeatures
} from "../../services/Admin/ProductService";

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

const BoxStyle = styled(Box)(({ theme }) => ({
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

function ProductSpecialFeatures(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [availableSpecialFeatures, setAvailableSpecialFeatures] =
    React.useState([]);
  const [notAvailableSpecialFeatures, setNotAvailableSpecialFeatures] =
    React.useState([]);
  const [selectedSpecialFeature, setSelectedSpecialFeature] =
    React.useState(-1);

  const handleGetSpecialFeatures = useCallback(async () => {
    if (!props.productId) return;

    const response = await getProductSpecialFeatures(props.productId);
    if (response.success) {
      setAvailableSpecialFeatures(
        response.data.data.availableSpecialFeatures
      );
      setNotAvailableSpecialFeatures(
        response.data.data.notAvailableSpecialFeatures
      );
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [enqueueSnackbar, props.productId]);

  useEffect(() => {
    handleGetSpecialFeatures();
  }, [handleGetSpecialFeatures]);

  const handleAddSpecialFeature = async () => {
    if (selectedSpecialFeature === -1) return;
    const response = await addProductSpecialFeatures(
      props.productId,
      selectedSpecialFeature
    );
    if (response.success) {
      enqueueSnackbar("Thêm tính năng đặc biệt thành công", {
        variant: "success",
      });
      handleGetSpecialFeatures();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleDeleteSpecialFeature = async (specialFeatureId) => {
    const response = await deleteProductSpecialFeatures(
      props.productId,
      specialFeatureId
    );
    if (response.success) {
      enqueueSnackbar("Xóa tính năng đặc biệt thành công", {
        variant: "success",
      });
      handleGetSpecialFeatures();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };
  return (
    // <FormEditCatalog>
    //   <Typography variant="h5">Tính năng đặc biệt</Typography>
    <Stack component={Paper} elevation={3} sx={paperStyle}>
      <Stack
        sx={{
          borderRadius: "10px",
          paddingTop: 0,
        }}
      >
        <BoxStyle
          sx={{
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <TieuDe>Tính năng đặc biệt</TieuDe>
        </BoxStyle>
        <BoxStyle
          sx={{
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <Typography variant="subtitle1" mb={1}>
            Thêm tính năng đặc biệt
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
                value={selectedSpecialFeature === -1 ? "" : selectedSpecialFeature}
                onChange={(e) => setSelectedSpecialFeature(e.target.value)}
                sx={{
                  borderRadius: "10px !important",
                  boxShadow: "0px 0px 5px 0px #3f3b3b1a",
                  height: "40px",
                  fontSize: "14px !important",
                }}
              >
                {notAvailableSpecialFeatures?.map((item, index) => (
                  <MenuItem
                    key={`not-available-special-feature-${index}`}
                    value={item.specialFeatureId}
                    sx={{
                      fontSize: "14px !important",
                    }}
                  >
                    {item.specialFeatureName}
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
              onClick={handleAddSpecialFeature}
            >
              Thêm mới
            </Button>
          </Stack>
          <Typography variant="subtitle1" mt={2} mb={1}>
            Danh sách tính năng đặc biệt
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={"85%"}>
                  <Typography variant="subtitle1">Tên tính năng</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1">Thao tác</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableSpecialFeatures?.map((item, index) => (
                <TableRow key={`available-special-feature-${index}`}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {item.specialFeatureName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      color="color1"
                      onClick={() => {
                        handleDeleteSpecialFeature(item.specialFeatureId);
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </BoxStyle>
      </Stack>
    </Stack>
    // </FormEditCatalog>
  );
}

export default ProductSpecialFeatures;
