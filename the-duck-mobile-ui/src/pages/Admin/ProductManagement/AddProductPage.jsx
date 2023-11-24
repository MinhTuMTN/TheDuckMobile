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
import React from "react";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { useReponsive } from "../../../hooks/useReponsive";
import styled from "@emotion/styled";

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

  const [brand, setBrand] = React.useState("");
  const [catalog, setCatalog] = React.useState("");
  const [OS, setOS] = React.useState("");

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleChangeCatalog = (event) => {
    setCatalog(event.target.value);
  };

  const handleChangeOS = (event) => {
    setOS(event.target.value);
  };

  const { isMediumScreen, isFullScreen } = useReponsive();

  const [inputValue, setInputValue] = React.useState("");
  const [inputDescription, setInputDescription] = React.useState("");

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
                padding: isFullScreen ? "1rem !important" : "0.5rem !important",
                borderRight: isMediumScreen ? "1px solid #e0e0e0" : "none",
                borderBottom: isMediumScreen ? "none" : "1px solid #e0e0e0",
              }}
            >
              <Box
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1c33e1158f1c5ecf/6319d97c454b1c2ebb3f4037/Carousel_iPhone14Plus_Purple_Placement01-PreOrder.png"
                  alt="Hình ảnh sản phẩm"
                />
                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
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
                    error={inputValue?.trim() === ""}
                    helperText={
                      inputValue?.trim() === "" &&
                      "Tên sản phẩm không được để trống"
                    }
                    value={inputValue}
                    fullWidth
                    onChange={(e) => setInputValue(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px !important",
                        padding: "18px 12px !important",
                      },
                    }}
                  />
                </Box>

                <MuiTextFeild
                  multiline
                  rows={4}
                  label="Mô tả sản phẩm"
                  placeholder="Nhập mô tả sản phẩm"
                  required
                  error={inputDescription?.trim() === ""}
                  helperText={
                    inputDescription?.trim() === "" &&
                    "Mô tả sản phẩm không được để trống"
                  }
                  value={inputDescription}
                  onChange={(e) => setInputDescription(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "14px !important",
                    },
                  }}
                />
                <Grid container spacing={1.5}>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <CustomTypography variant="body1">
                        Thương hiệu
                      </CustomTypography>

                      <FormControl fullWidth>
                        <Select
                          value={brand}
                          onChange={handleChangeBrand}
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
                              Samsung
                            </Typography>
                          </MenuItem>
                          <MenuItem value={2}>
                            <Typography style={{ fontSize: "14px" }}>
                              Iphone
                            </Typography>
                          </MenuItem>
                          <MenuItem value={3}>
                            <Typography style={{ fontSize: "14px" }}>
                              ViVo
                            </Typography>
                          </MenuItem>
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
                          value={catalog}
                          onChange={handleChangeCatalog}
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
                              Điện thoại
                            </Typography>
                          </MenuItem>
                          <MenuItem value={2}>
                            <Typography style={{ fontSize: "14px" }}>
                              Laptop
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            value={3}
                            sx={{
                              width: "auto",
                            }}
                          >
                            <Typography style={{ fontSize: "14px" }}>
                              Máy tính bảng
                            </Typography>
                          </MenuItem>
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
          </Grid>
        </Stack>
      </Grid>

      <Grid item xs={12} marginTop={3}>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
          <CustomButton variant="text" size="large">
            Huỷ
          </CustomButton>
          <CustomButton variant="contained" size="large">
            Cập nhật
          </CustomButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AddProductPage;
