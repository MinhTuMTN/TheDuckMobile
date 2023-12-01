import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import FormatDateTime from "../FormatDateTime";
import { getActiveBrands } from "../../services/Admin/BrandService";
import { enqueueSnackbar } from "notistack";
import { getActiveCatalogs } from "../../services/Admin/CatalogService";
import { getActiveOSs } from "../../services/Admin/OSService";
import { updateProduct } from "../../services/Admin/ProductService";
import { useNavigate } from "react-router-dom";

const BoxStyle = styled(Box)(({ theme }) => ({
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "520 !important",

  color: "  #101828 !important",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "400 !important",
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    paddingX: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const InputText = styled(TextField)(({ theme }) => ({
  borderRadius: "4px !important",
  paddingTop: "2px !important",
  "& .MuiInputBase-input": {
    // Các thuộc tính của .MuiInputBase-input ở đây
    fontSize: "14px !important",
    padding: "18px 12px !important",
  },
}));
const MultilineText = styled(TextField)(({ theme }) => ({
  borderRadius: "4px !important",
  paddingY: "0px !important",
  "& .MuiInputBase-input": {
    // Các thuộc tính của .MuiInputBase-input ở đây
    fontSize: "14px !important",
  },
}));

function BasicProductInDetailsPage(props) {
  const navigate = useNavigate();
  const { product } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openPopup, setOpenPopup] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [oss, setOSs] = useState([]);
  const [editProduct, setEditProduct] = useState({
    osId: 1,
    brandId: 1,
    catalogId: 1,
    productName: "",
    productDescription: "",
  })
  const handleChangeBrand = (event) => {
    setEditProduct((prev) => {
      return {
        ...prev,
        brandId: event.target.value
      };
    });
  };
  const handleChangeCatalog = (event) => {
    setEditProduct((prev) => {
      return {
        ...prev,
        catalogId: event.target.value
      };
    });
  };
  const handleChangeOS = (event) => {
    setEditProduct((prev) => {
      return {
        ...prev,
        osId: event.target.value
      };
    });
  };

  useEffect(() => {
    const handleGetBrands = async () => {
      const response = await getActiveBrands();
      if (response.success) {
        setBrands(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (brands.length === 0) {
      handleGetBrands()
    };
  }, [brands]);

  useEffect(() => {
    const handleGetCatalogs = async () => {
      const response = await getActiveCatalogs();
      if (response.success) {
        setCatalogs(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (catalogs.length === 0) {
      handleGetCatalogs()
    };
  }, [catalogs]);

  useEffect(() => {
    const handleGetOSs = async () => {
      const response = await getActiveOSs();
      if (response.success) {
        setOSs(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (oss.length === 0) {
      handleGetOSs();
    }
  }, [oss]);

  const handleEditButtonClick = () => {
    setOpenPopup(true);
    setEditProduct({
      osId: product.os?.osId,
      brandId: product.brand?.brandId,
      catalogId: product.catalog?.catalogId,
      productName: product.productName,
      productDescription: product.productDescription,
    })
  };

  const handleUpdateProduct = async () => {
    if (editProduct.productName.trim().length === 0) {
      return;
    }


    if (!editProduct.brandId) {
      return;
    }

    if (!editProduct.catalogId) {
      return;
    }

    if (!editProduct.osId) {
      return;
    }

    let response = await updateProduct(product.productId, {
      productName: editProduct.productName,
      productDescription: editProduct.productDescription,
      brandId: editProduct.brandId,
      osId: editProduct.osId,
      catalogId: editProduct.catalogId,
    });

    if (response.success) {
      enqueueSnackbar("Chỉnh sửa sản phẩm thành công!", { variant: "success" });
      setOpenPopup(false);
      navigate(0);
    } else {
      enqueueSnackbar("Chỉnh sửa sản phẩm thất bại!", { variant: "error" });
    }
  }
  return (
    <Stack
      component={Paper}
      elevation={3}
      sx={{
        marginTop: 4,
        borderRadius: "8px",
      }}
    >
      <Stack
        sx={{
          borderRadius: "10px",
          paddingTop: 0,
          paddingBottom: 1,
        }}
      >
        <BoxStyle
          component={Grid}
          alignItems={"center"}
          sx={{
            borderBottom: "1px solid #E0E0E0",
          }}
          container
        >
          <Grid item xs={6}>
            <TieuDe>Thông tin cơ bản</TieuDe>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
            <Button
              variant="text"
              sx={{
                paddingRight: "0px !important",
                color: "#4d4f53",
                fontWeight: "600 !important",
                fontSize: "14px !important",
              }}
              onClick={handleEditButtonClick}
            >
              Chỉnh sửa
            </Button>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>ID</TieuDeCot>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
                <NoiDung>{product.productId}</NoiDung>
              </Stack>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Tên sản phẩm</TieuDeCot>
            </Grid>

            <Grid item xs={12} sm={9}>
              <NoiDung>{product.productName}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Thương hiệu</TieuDeCot>
            </Grid>
            <Grid item xs={12} sm={9} md={8}>
              <NoiDung>{product.brand?.brandName}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Danh mục</TieuDeCot>
            </Grid>
            <Grid item xs={12} sm={9}>
              <NoiDung>{product.catalog?.catalogName}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Hệ điều hành</TieuDeCot>
            </Grid>
            <Grid item xs={12} sm={9}>
              <NoiDung>{product.os?.osName}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Ngày tạo</TieuDeCot>
            </Grid>
            <Grid item xs={12} sm={9}>
              <NoiDung><FormatDateTime dateTime={product.createdAt} /></NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Mô tả</TieuDeCot>
            </Grid>

            <Grid item xs={12} sm={9}>
              <NoiDung
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textAlign: "justify",
                }}
              >
                {product.productDescription}
              </NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
      </Stack>
      <BootstrapDialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="customized-dialog-title"
        sx={{
          maxHeight: "calc(100vh - 64px)",
        }}
      >
        <DialogTitle sx={{ m: 0, px: 4, py: 2 }} id="customized-dialog-title">
          <Typography
            style={{
              fontSize: "24px",
            }}
            sx={{
              fontWeight: 700,
            }}
          >
            Chỉnh sửa
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          style={{
            padding: "0px 32px 0px 32px",
            width: isSmallScreen ? "30rem" : "35rem",
          }}
        >
          <Stack direction={"column"} spacing={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Box>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      marginBottom: "4px",
                      color: !editProduct.productName.trim() ? "#f44336" : "#111927",
                    }}
                  >
                    Tên sản phẩm
                  </Typography>
                  <InputText
                    sx={{
                      size: "small",
                      padding: "0 !important",
                      fontSize: "14px !important",
                      fieldset: { borderColor: !editProduct.productName.trim() ? "red !important" : "inherit" }
                    }}
                    autoFocus
                    required
                    fullWidth
                    value={editProduct.productName}
                    onChange={(e) => setEditProduct((prev) => {
                      return {
                        ...prev,
                        productName: e.target.value
                      };
                    })}
                  />
                  {!editProduct.productName.trim() && (
                    <FormHelperText style={{ color: "red" }}>
                      Tên sản phẩm không được bỏ trống
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Thương hiệu
                  </Typography>

                  <FormControl fullWidth>
                    <Select
                      value={editProduct.brandId}
                      onChange={handleChangeBrand}
                      displayEmpty
                      required
                      size="small"
                      sx={{
                        fontSize: "14px !important",
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {brands.map((item, index) => (
                        <MenuItem value={item.brandId} key={index} >
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
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Danh mục
                  </Typography>

                  <FormControl fullWidth>
                    <Select
                      value={editProduct.catalogId}
                      onChange={handleChangeCatalog}
                      displayEmpty
                      required
                      size="small"
                      sx={{
                        fontSize: "14px !important",
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {catalogs.map((item, index) => (
                        <MenuItem value={item.catalogId} key={index} >
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
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Hệ điều hành
                  </Typography>

                  <FormControl fullWidth>
                    <Select
                      value={editProduct.osId}
                      onChange={handleChangeOS}
                      displayEmpty
                      required
                      size="small"
                      sx={{
                        fontSize: "14px !important",
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {oss.map((item, index) => (
                        <MenuItem value={item.osId} key={index}>
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
            <Box>
              <Typography
                variant="body1"
                style={{
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                Mô tả
              </Typography>
              <MultilineText
                className="multiline-text"
                multiline
                rows={4}
                fullWidth
                value={editProduct.productDescription}
                onChange={(e) => {
                  setEditProduct((prev) => {
                    return {
                      ...prev,
                      productDescription: e.target.value,
                    };
                  })
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdateProduct}>
            Cập nhật
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Stack>
  );
}

export default BasicProductInDetailsPage;
