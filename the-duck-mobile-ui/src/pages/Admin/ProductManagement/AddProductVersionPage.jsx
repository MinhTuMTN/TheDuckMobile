import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { useReponsive } from "../../../hooks/useReponsive";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ProductVersionSpecification from "../../../components/Store/ProductVersionSpecification";
import {
  addProductVersion,
  getProductVersion,
  getProductVersionAttributes,
  updateProductVersion,
} from "../../../services/Admin/ProductVersionService";
import { useSnackbar } from "notistack";
import { getAllColors } from "../../../services/Admin/ColorService";
import ColorButton from "../../../components/ColorButton";
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

function AddProductVersionPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isFullScreen } = useReponsive();
  const { state } = useLocation();
  const inputImgaes = React.useRef(null);
  const [images, setImages] = React.useState([]);
  const [imageURL, setImageURL] = React.useState([]);
  const [attributes, setAttributes] = React.useState([]);
  const [specifications, setSpecifications] = React.useState({});
  const [colors, setColors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { productVersionId } = useParams();
  const [oldImages, setOldImages] = React.useState([]);
  const [promotionPrice, setPromotionPrice] = React.useState("");
  const [versionName, setVersionName] = React.useState("");

  const [info, setInfo] = React.useState({
    productId: state?.productId,
    colorId: "",
    price: "0",
    versisonName: "",
  });
  // Preview images
  React.useEffect(() => {
    const listImages = [];
    images.forEach((image) => {
      const url = URL.createObjectURL(image);
      listImages.push(url);
    });
    setImageURL(listImages);

    return () => {
      listImages.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [images]);

  const handleGetAttributes = useCallback(async () => {
    if (!state?.productId) {
      enqueueSnackbar("Đã có lỗi xảy ra khi tải các thông tin sản phẩm 1", {
        variant: "error",
      });
      return;
    }

    const response = await getProductVersionAttributes(state?.productId);
    if (response.success) {
      setAttributes(response.data.data);
      response.data.data.forEach((attribute) => {
        if (attribute.type === 0) {
          setSpecifications((prev) => ({
            ...prev,
            [attribute.key]: "",
          }));
        }
        if (attribute.type === 1) {
          setSpecifications((prev) => ({
            ...prev,
            [attribute.key]: attribute.selectionValues[0],
          }));
        }
        if (attribute.type === 2) {
          setSpecifications((prev) => ({
            ...prev,
            [attribute.key]: false,
          }));
        }
      });
    } else
      enqueueSnackbar("Đã có lỗi xảy ra khi tải các thông tin sản phẩm", {
        variant: "error",
      });
  }, [state?.productId, enqueueSnackbar]);

  const handleGetColors = useCallback(async () => {
    const response = await getAllColors();

    if (response.success) {
      setColors(response.data.data);
    } else
      enqueueSnackbar("Đã có lỗi xảy ra khi tải các thông tin sản phẩm", {
        variant: "error",
      });
  }, [enqueueSnackbar]);

  const handleGetOldProductVersion = useCallback(async () => {
    const response = await getProductVersion(productVersionId);

    if (response.success) {
      const productVersion = response.data.data;
      setInfo({
        productId: productVersion.productId,
        colorId: productVersion.colorId,
        price: productVersion.price.toLocaleString("vn"),
        versisonName: productVersion.versionName,
      });
      setVersionName(productVersion.versionName);
      setOldImages(productVersion.images);
      setPromotionPrice(productVersion.promotionPrice.toLocaleString("vn"));
      setSpecifications(JSON.parse(productVersion.specification));
    } else
      enqueueSnackbar("Đã có lỗi xảy ra khi tải các thông tin sản phẩm", {
        variant: "error",
      });
  }, [enqueueSnackbar, productVersionId]);

  // Init data
  useEffect(() => {
    handleGetAttributes();
    handleGetColors();
    if (productVersionId) {
      handleGetOldProductVersion();
    }
  }, [
    handleGetAttributes,
    handleGetColors,
    productVersionId,
    handleGetOldProductVersion,
  ]);

  const handleCheckProperties = () => {
    if (
      info?.versisonName?.trim() === "" ||
      info?.price?.trim() === "" ||
      info?.colorId?.trim() === ""
    ) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
        variant: "error",
      });
      return false;
    }

    if (images.length === 0 && !productVersionId) {
      enqueueSnackbar("Vui lòng chọn ảnh cho sản phẩm", {
        variant: "error",
      });
      return false;
    }

    attributes.forEach((attribute) => {
      if (attribute.isRequired && !specifications[attribute.key]) {
        enqueueSnackbar(`Vui lòng nhập ${attribute.displayName}`, {
          variant: "error",
        });
        return false;
      }
    });

    if (!state?.productId) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
      return false;
    }

    return true;
  };

  const handleAddProductVersion = async () => {
    if (!handleCheckProperties()) return;
    // try to cast price to number. If error, enqueueSnackbar and return
    let price = 0;
    try {
      price = parseFloat(info?.price.replace(/,/g, ""));
      if (isNaN(price)) {
        enqueueSnackbar("Giá tiền không hợp lệ", {
          variant: "error",
        });
        return;
      }
    } catch (error) {
      enqueueSnackbar("Giá tiền không hợp lệ", {
        variant: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("productId", state?.productId);
    formData.append("colorId", info?.colorId);
    formData.append("Price", price);
    formData.append("VersionName", info?.versisonName);
    formData.append("Specification", JSON.stringify(specifications));

    images.forEach((image) => {
      formData.append("Images", image);
    });

    setIsLoading(true);
    const response = await addProductVersion(formData);
    if (response.success) {
      enqueueSnackbar("Tạo phiên bản thành công", {
        variant: "success",
      });
      navigate(`/admin/product-management/${state?.productId}`);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  const handleUpdateProductVersion = async () => {
    if (!handleCheckProperties()) return;
    // try to cast price to number. If error, enqueueSnackbar and return
    let price = 0;
    try {
      price = parseFloat(info?.price.replace(/,/g, ""));
      if (isNaN(price)) {
        enqueueSnackbar("Giá tiền không hợp lệ", {
          variant: "error",
        });
        return;
      }
    } catch (error) {
      enqueueSnackbar("Giá tiền không hợp lệ", {
        variant: "error",
      });
      return;
    }

    // try to cast promotionPrice to number. If error, enqueueSnackbar and return
    let promotionPriceRequest = 0;
    try {
      promotionPriceRequest = parseFloat(promotionPrice?.replace(/,/g, ""));
      if (isNaN(promotionPriceRequest)) {
        enqueueSnackbar("Giá khuyến mãi không hợp lệ 1", {
          variant: "error",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Giá khuyến mãi không hợp lệ 2", {
        variant: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("productId", state?.productId);
    formData.append("colorId", info?.colorId);
    formData.append("Price", price);
    formData.append("VersionName", info?.versisonName);
    formData.append("Specification", JSON.stringify(specifications));
    formData.append("promotionPrice", promotionPriceRequest);
    formData.append("promotionPrice", promotionPrice);

    images.forEach((image) => {
      formData.append("NewImages", image);
    });

    oldImages.forEach((image) => {
      formData.append("OldImagesUrl", image);
    });

    setIsLoading(true);
    const response = await updateProductVersion(productVersionId, formData);
    if (response.success) {
      enqueueSnackbar("Cập nhật phiên bản thành công", {
        variant: "success",
      });
      navigate(`/admin/product-management/${state?.productId}`);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
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
            Trang sản phẩm
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
          {!productVersionId
            ? `Tạo phiên bản mới cho ${state?.productName}`
            : `Cập nhật phiên bản cho ${state?.productName} - ${versionName}`}
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
          <Grid
            container
            sx={{
              paddingX: "0.5rem !important",
              paddingY: "1rem !important",
              width: "100%",
            }}
          >
            <Stack
              spacing={2.5}
              paddingY={2}
              paddingX={{
                xs: "1rem !important",
                md: "1.5rem !important",
              }}
              sx={{ width: "100%" }}
            >
              <Grid container spacing={2.5} alignItems={"flex-start"}>
                <Grid
                  item
                  xs={12}
                  md={8}
                  component={Box}
                  sx={{
                    width: "100%",
                  }}
                >
                  <MuiTextFeild
                    label="Tên phiên bản"
                    placeholder="Nhập tên phiên bản"
                    required
                    error={info?.versisonName?.trim() === ""}
                    helperText={
                      info?.versisonName?.trim() === ""
                        ? "Tên phiên bản không được để trống"
                        : ""
                    }
                    value={info?.versisonName}
                    fullWidth
                    size={"small !important"}
                    onChange={(e) =>
                      setInfo({ ...info, versisonName: e.target.value })
                    }
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px !important",
                        padding: "18px 12px !important",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4} component={Box}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <MuiTextFeild
                      label="Giá tiền"
                      placeholder="Nhập giá tiền"
                      required
                      type="text"
                      error={info?.price?.trim() === ""}
                      helperText={
                        info?.price?.trim() === ""
                          ? "Giá tiền không được để trống"
                          : ""
                      }
                      value={info?.price}
                      fullWidth
                      onChange={(e) => {
                        let nums = e.target.value.replace(/,/g, "");
                        if (nums === "") nums = "0";
                        if (!nums || nums.endsWith(".")) return;
                        const value = parseFloat(nums).toLocaleString("vn");
                        setInfo({ ...info, price: value });
                      }}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "14px !important",
                          padding: "18px 12px !important",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">VNĐ</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                {productVersionId && (
                  <Grid item xs={12} md={12} component={Box}>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <MuiTextFeild
                        label="Giá sau khi giảm giá"
                        placeholder="Nhập giá tiền sau khi giảm giá"
                        required
                        type="text"
                        error={promotionPrice?.trim() === ""}
                        helperText={
                          info?.price?.trim() === ""
                            ? "Giá tiền không được để trống"
                            : ""
                        }
                        value={promotionPrice}
                        fullWidth
                        onChange={(e) => {
                          let nums = e.target.value.replace(/,/g, "");
                          if (nums === "") nums = "0";
                          if (!nums || nums.endsWith(".")) return;
                          const value = parseFloat(nums).toLocaleString("vn");
                          setPromotionPrice(value);
                        }}
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: "14px !important",
                            padding: "18px 12px !important",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              VNĐ
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>

              <Grid container spacing={2.5} alignItems={"center"}>
                <Grid item xs={12}>
                  <Box>
                    <CustomTypography variant="body1">Màu sắc</CustomTypography>

                    <FormControl fullWidth>
                      <Select
                        value={info?.colorId}
                        onChange={(e) =>
                          setInfo({ ...info, colorId: e.target.value })
                        }
                        displayEmpty
                        required
                        size="small"
                        sx={{
                          fontSize: "14px !important",
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {colors.map((color) => (
                          <MenuItem value={color.colorId} key={color.colorId}>
                            <Stack
                              direction={"row"}
                              spacing={1}
                              display={"flex"}
                              alignItems={"center"}
                            >
                              <ColorButton color={color.colorCode} />
                              <Typography style={{ fontSize: "14px" }}>
                                {color.colorName}
                              </Typography>
                            </Stack>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Stack>
      </Grid>

      <Grid item xs={12} marginTop={3}>
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: "25px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              alignItems: "center",
              paddingX: "1rem !important",
              paddingY: "0.5rem !important",
            }}
          >
            <Grid item xs={7} sm={6}>
              <Typography
                variant="body1"
                style={{
                  fontSize: ["16px !important", "20px !important"],
                  fontWeight: "600",
                  borderRadius: "25px 25px 0 0 ",
                }}
              >
                Danh sách hình ảnh
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="medium"
                sx={{
                  fontSize: "16px !important",
                  borderRadius: "10px !important",
                  color: "#242323",
                }}
                onClick={() => inputImgaes.current.click()}
              >
                <CloudUploadIcon
                  sx={{
                    fontSize: "24px",
                    color: "#242323",
                    marginRight: "0.5rem",
                  }}
                />
                Tải ảnh
              </Button>
              <input
                type="file"
                style={{
                  display: "none",
                }}
                ref={inputImgaes}
                multiple
                onChange={(e) => {
                  setImages([...images, ...e.target.files]);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              paddingX: "0.5rem !important",
              paddingY: "1rem !important",
              width: "100%",
              alignItems: "center",
            }}
          >
            {imageURL.length === 0 && oldImages?.length === 0 ? (
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  width: "100%",
                  paddingX: "1rem !important",
                  paddingY: ["1rem !important", "2rem !important"],
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px !important",
                  }}
                >
                  Chọn hình ảnh cho sản phẩm
                </Typography>
                <AddPhotoAlternateIcon />
              </Stack>
            ) : (
              <List component={Grid} container>
                {oldImages.map((image, index) => (
                  <Grid item xs={6} sm={4} md={3} key={`old-${index}`}>
                    <ListItem>
                      <CardMedia
                        component="img"
                        height="200px"
                        style={{
                          objectFit: "contain",
                        }}
                        image={image}
                        alt={`Hình ảnh sản phẩm ${index}`}
                      />
                      <IconButton
                        size="small"
                        style={{
                          position: "absolute",

                          top: 0,
                          right: 0,
                          background: "white",
                        }}
                        onClick={() => {
                          const newImages = oldImages.filter(
                            (image, i) => i !== index
                          );
                          setOldImages(newImages);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </ListItem>
                  </Grid>
                ))}
                {imageURL.map((url, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <ListItem>
                      <CardMedia
                        component="img"
                        height="200px"
                        style={{
                          objectFit: "contain",
                        }}
                        image={url}
                        alt={`Hình ảnh sản phẩm ${index}`}
                      />
                      <IconButton
                        size="small"
                        style={{
                          position: "absolute",

                          top: 0,
                          right: 0,
                          background: "white",
                        }}
                        onClick={() => {
                          const newImages = images.filter(
                            (image, i) => i !== index
                          );
                          setImages(newImages);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </ListItem>
                  </Grid>
                ))}
              </List>
            )}
          </Grid>
        </Stack>
      </Grid>

      <ProductVersionSpecification
        attributes={attributes}
        specifications={specifications}
        setSpecifications={setSpecifications}
      />

      <Grid item xs={12} marginTop={3}>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
          <CustomButton
            variant="text"
            size="large"
            onClick={() => navigate(-1)}
          >
            Huỷ
          </CustomButton>
          <CustomButton
            variant="contained"
            size="large"
            onClick={
              productVersionId
                ? handleUpdateProductVersion
                : handleAddProductVersion
            }
          >
            {productVersionId ? "Cập nhật" : "Tạo mới"}
          </CustomButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AddProductVersionPage;
