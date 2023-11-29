import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/upload.png";
import CustomTextarea from "../../../components/CustomTextarea";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { useReponsive } from "../../../hooks/useReponsive";
import { getAllOSs } from "../../../services/Admin/OSService";
import { getAllBrands } from "../../../services/Admin/BrandService";
import { getAllCatalogs } from "../../../services/Admin/CatalogService";
import { useSnackbar } from "notistack";
import { createProduct } from "../../../services/Admin/ProductService";
import Loading from "../../../components/Loading";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "2px !important",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "14px !important",
  borderRadius: "16px !important",
  width: "7.5rem !important",
}));

function AddProductPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = React.useState(null); // file to be uploaded
  const [imageURL, setImageURL] = React.useState(null);
  const inputFile = useRef(null);
  const [brand, setBrand] = React.useState([]);
  const [catalog, setCatalog] = React.useState([]);
  const [OS, setOS] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false); // for loading button

  const [info, setInfo] = useState({
    productName: "",
    productDescription: "",
    brandId: -1,
    catalogId: -1,
    osId: -1,
  });

  const handleGetInfo = useCallback(async () => {
    const osResponse = await getAllOSs(true);
    if (osResponse.success) setOS(osResponse.data.data);

    const barndResponse = await getAllBrands(true);
    if (barndResponse.success) setBrand(barndResponse.data.data);

    const catalogResponse = await getAllCatalogs(true);
    if (catalogResponse.success) setCatalog(catalogResponse.data.data);
  }, []);

  useEffect(() => {
    handleGetInfo();
  }, [handleGetInfo]);

  const { isMediumScreen, isFullScreen } = useReponsive();

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageURL(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleCreateProduct = async () => {
    // Validation
    if (info.productName?.trim() === "") {
      enqueueSnackbar("Tên sản phẩm không được để trống", { variant: "error" });
      return;
    }

    if (info.productDescription?.trim() === "") {
      enqueueSnackbar("Mô tả sản phẩm không được để trống", {
        variant: "error",
      });
      return;
    }

    if (info.brandId === -1) {
      enqueueSnackbar("Thương hiệu không được để trống", { variant: "error" });
      return;
    }

    if (info.catalogId === -1) {
      enqueueSnackbar("Danh mục không được để trống", { variant: "error" });
      return;
    }

    if (info.osId === -1) {
      enqueueSnackbar("Hệ điều hành không được để trống", { variant: "error" });
      return;
    }

    if (!file) {
      enqueueSnackbar("Hình ảnh sản phẩm không được để trống", {
        variant: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("productName", info.productName);
    formData.append("productDescription", info.productDescription);
    formData.append("brandId", info.brandId);
    formData.append("catalogId", info.catalogId);
    formData.append("osId", info.osId);
    formData.append("thumbnail", file);

    setIsLoading(true);
    const response = await createProduct(formData);
    if (response.success) {
      enqueueSnackbar("Tạo sản phẩm thành công", { variant: "success" });
      navigate(`/admin/product-management`);
    } else {
      enqueueSnackbar("Tạo sản phẩm thất bại", { variant: "error" });
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Grid
      container
      sx={{
        pt: 3,
        pb: 4.5,
        px: isFullScreen ? 8 : 3,
      }}
    >
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={() => navigate(`/admin/product-management`)}>
            <ArrowBackIosIcon
              sx={{
                fontSize: ["14px", "18px"],
              }}
            />
          </IconButton>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px !important",
            }}
          >
            Danh sách sản phẩm
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{
            fontSize: ["20px", "28px"],
          }}
          fontWeight="700"
          paddingX={2}
          paddingTop={4}
          paddingBottom={3}
        >
          Tạo sản phẩm mới
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: "25px",
          }}
        >
          <Typography
            variant="body1"
            paddingX={3}
            paddingY={2}
            style={{
              fontSize: "20px",
              fontWeight: "600",
              borderRadius: "25px 25px 0 0 ",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            Thông tin sản phẩm
          </Typography>
          <Grid container>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                padding: isFullScreen ? "1.5rem !important" : "1rem !important",
                borderRight: isMediumScreen ? "1px solid #e0e0e0" : "none",
                borderBottom: isMediumScreen ? "none" : "1px solid #e0e0e0",
              }}
            >
              <Box
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  style={{
                    flexBasis: "90%",
                    width: "100%",
                  }}
                  image={imageURL ? imageURL : pic}
                  alt="Hình ảnh sản phẩm"
                />
                <Button
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => inputFile.current.click()}
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: "24px",
                      color: "#242323",
                      marginRight: "0.5rem",
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Tải ảnh lên
                  </Typography>
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    ref={inputFile}
                    type="file"
                    style={{ display: "none" }}
                  />
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                paddingX: "0.5rem !important",
                paddingY: "1rem !important",
              }}
            >
              <Stack spacing={2.5} padding={2}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <MuiTextFeild
                    label="Tên sản phẩm"
                    placeholder="Nhập tên sản phẩm"
                    required
                    error={info.productName?.trim() === ""}
                    helperText={
                      info.productName?.trim() === "" &&
                      "Tên sản phẩm không được để trống"
                    }
                    value={info.productName}
                    fullWidth
                    onChange={(e) =>
                      setInfo({ ...info, productName: e.target.value })
                    }
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px !important",
                        padding: "18px 12px !important",
                      },
                    }}
                  />
                </Box>

                <CustomTextarea
                  value={info.productDescription}
                  onChange={(e) =>
                    setInfo({ ...info, productDescription: e.target.value })
                  }
                  label="Mô tả sản phẩm"
                  placeholder="Nhập mô tả sản phẩm"
                  error={info?.productDescription?.trim() === ""}
                  required
                  helperText={
                    info?.productDescription?.trim() === ""
                      ? "Mô tả sản phẩm không được để trống"
                      : ""
                  }
                />
                <Grid container spacing={1.5}>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <CustomTypography variant="body1">
                        Thương hiệu
                      </CustomTypography>

                      <FormControl fullWidth>
                        <Select
                          value={info.brandId === -1 ? "" : info.brandId}
                          onChange={(e) =>
                            setInfo({ ...info, brandId: e.target.value })
                          }
                          displayEmpty
                          required
                          size="small"
                          sx={{
                            fontSize: "14px !important",
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {brand?.map((item, index) => (
                            <MenuItem
                              key={`brand-${index}`}
                              value={item.brandId}
                            >
                              <Typography style={{ fontSize: "14px" }}>
                                {item.brandName}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <CustomTypography variant="body1">
                        Danh mục
                      </CustomTypography>

                      <FormControl fullWidth>
                        <Select
                          value={info.catalogId === -1 ? "" : info.catalogId}
                          onChange={(e) =>
                            setInfo({ ...info, catalogId: e.target.value })
                          }
                          displayEmpty
                          required
                          size="small"
                          sx={{
                            fontSize: "14px !important",
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {catalog?.map((item, index) => (
                            <MenuItem
                              key={`catalog-${index}`}
                              value={item.catalogId}
                            >
                              <Typography style={{ fontSize: "14px" }}>
                                {item.catalogName}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <CustomTypography variant="body1">
                        Hệ điều hành
                      </CustomTypography>

                      <FormControl fullWidth>
                        <Select
                          value={info.osId === -1 ? "" : info.osId}
                          onChange={(e) =>
                            setInfo({ ...info, osId: e.target.value })
                          }
                          displayEmpty
                          required
                          size="small"
                          sx={{
                            fontSize: "14px !important",
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {OS?.map((item, index) => (
                            <MenuItem key={`os-${index}`} value={item.osId}>
                              <Typography style={{ fontSize: "14px" }}>
                                {item.osName}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Grid>

      <Grid item xs={12} marginTop={3}>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
          <CustomButton variant="text" size="large">
            Huỷ
          </CustomButton>
          <CustomButton
            variant="contained"
            size="large"
            onClick={handleCreateProduct}
          >
            Tạo mới
          </CustomButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AddProductPage;
