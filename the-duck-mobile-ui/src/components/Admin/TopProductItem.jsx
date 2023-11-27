import styled from "@emotion/styled";
import {
  Box,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo } from "react";

const CustomText = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
}));

function useCustomMediaQuery() {
  const isLargeScreen = useMediaQuery("(min-width: 850px)");
  const isMediumScreen = useMediaQuery("(min-width: 750px)");

  return useMemo(() => {
    if (isLargeScreen) {
      return "100px";
    } else if (isMediumScreen) {
      return "150px";
    } else {
      return "300px";
    }
  }, [isLargeScreen, isMediumScreen]);
}
function TopProductItem(props) {
  const maxWidth = useCustomMediaQuery();

  return (
    <Grid container spacing={0.5} alignItems={"center"}>
      <Grid item xs={7.5} container>
        <Grid item lg={4} sm={3} xs={4} md={2}>
          <CardMedia
            component="img"
            src="https://cdn-v2.didongviet.vn/files/media/catalog/product/s/a/samsung-galaxy-s23-ultra-5g-mau-xanh.png"
            alt="Hình ảnh sản phẩm"
            style={{ maxHeight: "5rem", maxWidth: "5rem" }}
          />
        </Grid>
        <Grid item lg={8} sm={9} xs={8} md={10}>
          <Stack direction={"column"} spacing={0.5}>
            <CustomText
              variant="body1"
              style={{
                fontWeight: "500",
              }}
            >
              SamSung Galaxy S21 Ultra 5G
            </CustomText>
            <CustomText
              variant="body1"
              style={{
                color: "#667085",
                fontWeight: "400",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: maxWidth,
              }}
            >
              Điện thoại
            </CustomText>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <CustomText
          variant="body1"
          style={{
            fontWeight: "550",
            color: "#10b981",
          }}
        >
          1.000.000
        </CustomText>
        <CustomText
          style={{
            fontWeight: "400",
            color: "#667085",
          }}
        >
          Lượt bán
        </CustomText>
      </Grid>
      <Grid
        item
        xs={1.5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: "4px 8px",
            borderRadius: "12px",
            border: "1px solid #E0E0E0",
            backgroundColor: "#E0E0E0",
            width: "fit-content",
            textAlign: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#101828",
              width: "fit-content",
            }}
          >
            #1
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default TopProductItem;
