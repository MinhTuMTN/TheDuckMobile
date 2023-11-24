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
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import FormatDateTime from "../FormatDateTime";

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
  const { product } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [catalog, setCatalog] = useState("");
  const [brand, setBrand] = useState("");
  const [OS, setOS] = useState("");
  const [inputValue, setInputValue] = useState("");
  const isInputEmpty = inputValue.trim() === "";
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleChangeCatalog = (event) => {
    setCatalog(event.target.value);
  };
  const handleChangeOS = (event) => {
    setOS(event.target.value);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
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
              onClick={() => setOpenPopup(true)}
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
              <NoiDung>{product.brandName}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Danh mục</TieuDeCot>
            </Grid>
            <Grid item xs={12} sm={9}>
              <NoiDung>{product.catalogName}</NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
        <BoxStyle>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <TieuDeCot>Hệ điều hành</TieuDeCot>
            </Grid>
            <Grid item xs={12} sm={9}>
              <NoiDung>{product.osName}</NoiDung>
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
            variant="h6"
            style={{
              fontSize: "24px",
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
            <Box>
              <Typography
                variant="body1"
                style={{
                  fontSize: "14px",
                  marginBottom: "4px",
                  color: isInputEmpty ? "#f44336" : "#111927",
                }}
              >
                Tên sản phẩm
              </Typography>
              <InputText
                sx={{
                  size: "small",
                  padding: "0 !important",
                  fontSize: "14px !important",
                  borderColor: isInputEmpty ? "red" : "inherit",
                }}
                autoFocus
                required
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {isInputEmpty && (
                <FormHelperText style={{ color: "red" }}>
                  Tên sản phẩm không được bỏ trống
                </FormHelperText>
              )}
            </Box>
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
                          Samsung
                        </Typography>
                      </MenuItem>
                      <MenuItem value={3}>
                        <Typography style={{ fontSize: "14px" }}>
                          Samsung
                        </Typography>
                      </MenuItem>
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
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenPopup(false)}>
            Cập nhật
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Stack>
  );
}

export default BasicProductInDetailsPage;
