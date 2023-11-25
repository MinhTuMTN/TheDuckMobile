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
import React, { useEffect, useState } from "react";
import ListProductVersion from "./ListProductVersion";
import BasicProductInDetailsPage from "./BasicProductInDetailsPage";
import DialogConfirm from "../DialogConfirm";
import { deleteProduct, restoreProduct } from "../../services/Admin/ProductService";
import { enqueueSnackbar } from "notistack";

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
  const theme = useTheme();
  const { product } = props;
  let status = product.isDeleted;
  const isFullWidth = useMediaQuery(theme.breakpoints.up("md"));
  const spacingValue = isFullWidth ? 2 : 0;
  const [statusProduct, setStatusProduct] = useState(false)
  const [editStatus, setEditStatus] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    setEditStatus(status);
    setStatusProduct(status);
  }, [status]);

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
    if (statusProduct !== event.target.value) {
      setDisabledButton(false);
    }
    else {
      setDisabledButton(true);
    }
  };

  const handleUpdateButtonClick = async () => {
    let response;
    if (statusProduct) {
      response = await restoreProduct(product.productId);
      if (response.success) {
        enqueueSnackbar("Mở khóa sản phẩm thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusProduct(editStatus);
      } else {
        enqueueSnackbar("Mở khóa sản phẩm thất bại!", { variant: "error" });
      }
    } else {
      response = await deleteProduct(product.productId);
      if (response.success) {
        enqueueSnackbar("Khóa sản phẩm thành công!", { variant: "success" });
        setDisabledButton(true);
        setStatusProduct(editStatus);
      } else {
        enqueueSnackbar("Khóa sản phẩm thất bại!", { variant: "error" });
      }
    }
  };

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
                image={product.thumbnail}
                alt="product-thumbnail"
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
                  value={typeof editStatus === "undefined" ? false : editStatus}
                  onChange={handleStatusChange}
                  size="small"
                  sx={{
                    borderRadius: "10px !important",
                    boxShadow: "0px 0px 5px 0px #3f3b3b1a",
                    height: "40px",
                    fontSize: "14px !important",
                  }}
                >
                  <MenuItem
                    value={false}
                    sx={{
                      fontSize: "14px !important",
                    }}
                  >
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
                    value={true}
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
                disabled={disabledButton}
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "500 !important",
                  whiteSpace: "nowrap", // Thêm vào đây
                }}
                onClick={(e) => {
                  setDeleteDialog(true);
                }}
              >
                Cập nhật
              </Button>
              <DialogConfirm
                open={deleteDialog}
                title={statusProduct ? "Mở khóa sản phẩm" : "Khóa sản phẩm"}
                content={
                  statusProduct
                    ? "Bạn có chắc chắn muốn mở khóa sản phẩm này?"
                    : "Bạn có chắc chắn muốn khóa sản phẩm này?"
                }
                okText={statusProduct ? "Khôi phục" : "Khóa"}
                cancelText={"Hủy"}
                onOk={handleUpdateButtonClick}
                onCancel={() => setDeleteDialog(false)}
                onClose={() => setDeleteDialog(false)}
              />
            </Stack>
          </BoxStyle2>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8.5}>
        <BasicProductInDetailsPage product={product} />
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
                >
                  Thêm
                </Button>
              </Grid>
            </BoxStyle>
            <Box>
              <ListProductVersion productVersions={product.productVersions} />
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BasicProductDetails;
