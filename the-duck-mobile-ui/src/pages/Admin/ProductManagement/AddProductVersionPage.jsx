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
import React from "react";
import { useNavigate } from "react-router-dom";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { useReponsive } from "../../../hooks/useReponsive";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

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

  const { isFullScreen } = useReponsive();

  const [OS, setOS] = React.useState("");

  const handleChangeOS = (event) => {
    setOS(event.target.value);
  };

  const inputImgaes = React.useRef(null);

  const [inputValue, setInputValue] = React.useState("");
  const [inputPrice, setInputPrice] = React.useState("");

  const [images, setImages] = React.useState([]);
  const [imageURL, setImageURL] = React.useState([]);

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
          Tạo phiên bản mới cho Iphone 15 Pro Max
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
              <Grid container spacing={2.5} alignItems={"center"}>
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
                    error={inputValue?.trim() === ""}
                    helperText={
                      inputValue?.trim() === "" &&
                      "Tên phiên bản không được để trống"
                    }
                    value={inputValue}
                    fullWidth
                    size={"small !important"}
                    onChange={(e) => setInputValue(e.target.value)}
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
                      error={inputPrice?.trim() === ""}
                      helperText={
                        inputPrice?.trim() === "" &&
                        "Giá tiền không được để trống"
                      }
                      value={inputPrice}
                      fullWidth
                      onChange={(e) => setInputPrice(e.target.value)}
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
              </Grid>

              <Grid container spacing={2.5} alignItems={"center"}>
                <Grid item xs={12}>
                  <Box>
                    <CustomTypography variant="body1">Màu sắc</CustomTypography>

                    <FormControl fullWidth>
                      <Select
                        value={OS}
                        onChange={handleChangeOS}
                        displayEmpty
                        required
                        size="small"
                        sx={{
                          fontSize: "14px !important",
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={1}>
                          <Typography style={{ fontSize: "14px" }}>
                            IOS
                          </Typography>
                        </MenuItem>
                        <MenuItem value={2}>
                          <Typography style={{ fontSize: "14px" }}>
                            Android
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          value={3}
                          sx={{
                            width: "auto",
                          }}
                        >
                          <Typography style={{ fontSize: "14px" }}>
                            Windows
                          </Typography>
                        </MenuItem>
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
            <Grid item xs={6}>
              <Typography
                variant="body1"
                style={{
                  fontSize: ["16px !im", "20px"],
                  fontWeight: "600",
                  borderRadius: "25px 25px 0 0 ",
                }}
              >
                Danh sách hình ảnh
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
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
            }}
          >
            <List component={Grid} container>
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
          </Grid>
        </Stack>
      </Grid>

      <Grid item xs={12} marginTop={3}>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
          <CustomButton variant="text" size="large">
            Huỷ
          </CustomButton>
          <CustomButton variant="contained" size="large">
            Tạo mới
          </CustomButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AddProductVersionPage;
