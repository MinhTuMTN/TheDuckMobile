import styled from "@emotion/styled";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TopProductItem from "./TopProductItem";

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

const BoxStyle = styled(Box)(({ theme }) => ({
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "14px !important",
  paddingBottom: "14px !important",
}));

const BoxStyle2 = styled(Box)(({ theme }) => ({
  paddingLeft: "12px !important",
  paddingRight: "12px !important",
  paddingTop: "12px !important",
  paddingBottom: "8px !important",
  width: "100%",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const CustomListItem = styled(ListItem)({
  paddingBottom: "16px",

  borderBottom: "1px solid #ccc",
  "&:last-child": {
    borderBottom: "none",
  },
});
function TopProduct(props) {
  const { topProducts } = props;
  return (
    <Stack component={Paper} elevation={3} sx={paperStyle}>
      <BoxStyle
        component={Stack}
        direction={"row"}
        alignItems={"center"}
        spacing={0.5}
        sx={{
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701008463/top-5_suollo.png"
          }
          alt="top-product"
          style={{
            width: "30px",
            height: "30px",
            objectFit: "contain",
            marginTop: "8px",
          }}
        />
        <TieuDe>Sản phẩm bán chạy</TieuDe>
      </BoxStyle>
      <BoxStyle2 className="Hello">
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <List
            sx={{
              padding: 0,
              width: "100%",
            }}
          >
            <Stack direction={"column"} spacing={2}>
              {topProducts?.map((product, index) => (
                <CustomListItem
                  sx={{
                    padding: 0,
                  }}
                  key={index}
                >
                  <TopProductItem product={product} index={index} />
                </CustomListItem>
              ))}
              {/* 
              <CustomListItem
                sx={{
                  padding: 0,
                }}
              >
                <TopProductItem />
              </CustomListItem>
              <CustomListItem
                sx={{
                  padding: 0,
                }}
              >
                <TopProductItem />
              </CustomListItem>
              <CustomListItem
                sx={{
                  padding: 0,
                }}
              >
                <TopProductItem />
              </CustomListItem>
              <CustomListItem
                sx={{
                  padding: 0,
                }}
              >
                <TopProductItem />
              </CustomListItem> */}
            </Stack>
          </List>
        </Stack>
      </BoxStyle2>
    </Stack>
  );
}

export default TopProduct;
