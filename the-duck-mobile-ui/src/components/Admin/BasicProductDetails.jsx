import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ListProductVersion from "./ListProductVersion";
import BasicProductInDetailsPage from "./BasicProductInDetailsPage";
import { useNavigate } from "react-router-dom";

const BoxStyle = styled(Box)(({ theme }) => ({
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const BoxStyle2 = styled(Box)(({ theme }) => ({
  paddingLeft: "12px !important",
  paddingRight: "12px !important",
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

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

function BasicProductDetails(props) {
  const [statusProduct, setStatusProduct] = React.useState("");

  const handleChangeStatusProduct = (event) => {
    setStatusProduct(event.target.value);
  };

  const theme = useTheme();
  const isFullWidth = useMediaQuery(theme.breakpoints.up("md"));
  const spacingValue = isFullWidth ? 2 : 0;

  const navigate = useNavigate();
  return (
    <Grid container spacing={spacingValue}>
      <Grid item xs={12} md={3.5}>
        <Stack component={Paper} elevation={3} sx={paperStyle}>
          <BoxStyle
            component={Grid}
            alignItems={"center"}
            sx={{
              borderBottom: "1px solid #E0E0E0",
            }}
            container
          >
            <Grid item xs={6}>
              <TieuDe>Hình ảnh</TieuDe>
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
              >
                Chỉnh sửa
              </Button>
            </Grid>
          </BoxStyle>
          <BoxStyle2>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CardMedia
                component="img"
                height="fit-content"
                image="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1c33e1158f1c5ecf/6319d97c454b1c2ebb3f4037/Carousel_iPhone14Plus_Purple_Placement01-PreOrder.png"
                alt="Paella dish"
              />
            </Stack>
          </BoxStyle2>
        </Stack>
        <Stack component={Paper} elevation={3} sx={paperStyle}>
          <BoxStyle
            component={Grid}
            alignItems={"center"}
            sx={{
              borderBottom: "1px solid #E0E0E0",
            }}
            container
          >
            <TieuDe>Trạng thái</TieuDe>
          </BoxStyle>
          <BoxStyle2>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statusProduct}
                  onChange={handleChangeStatusProduct}
                  size="small"
                  sx={{
                    borderRadius: "10px !important",
                    boxShadow: "0px 0px 5px 0px #3f3b3b1a",
                    height: "40px",
                    fontSize: "14px !important",
                  }}
                >
                  <MenuItem
                    value={1}
                    sx={{
                      fontSize: "14px !important",
                    }}
                  >
                    {" "}
                    <CircleIcon
                      style={{
                        color: "#10af4d",
                        fontSize: "8px",
                        marginRight: "5px",
                        width: "fit-content",
                      }}
                    />
                    Đang bán
                  </MenuItem>
                  <MenuItem
                    value={2}
                    sx={{
                      fontSize: "14px !important",
                    }}
                  >
                    {" "}
                    <CircleIcon
                      sx={{
                        color: "#af1010",
                        fontSize: "8px",
                        marginRight: "5px",
                      }}
                    />
                    Ngưng bán
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "500 !important",
                  whiteSpace: "nowrap", // Thêm vào đây
                }}
              >
                Cập nhật
              </Button>
            </Stack>
          </BoxStyle2>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8.5}>
        <BasicProductInDetailsPage />
        <Stack component={Paper} elevation={3} sx={paperStyle}>
          <Stack
            sx={{
              borderRadius: "10px",
              paddingTop: 0,
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
                <TieuDe>Các phiên bản</TieuDe>
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
                  onClick={() => {
                    navigate("/admin/product-management/add-product-version");
                  }}
                >
                  Thêm
                </Button>
              </Grid>
            </BoxStyle>
            <Box>
              <ListProductVersion />
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BasicProductDetails;
