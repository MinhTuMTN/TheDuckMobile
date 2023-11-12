import styled from "@emotion/styled";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FormatCurrency from "../FormatCurrency";

const Items = [
  {
    id: 1,
    name: "Điện thoại SamSung Galaxy M31",
    quantity: 3,
    price: 100000000,
  },
  {
    id: 2,
    name: "Điện thoại iPhone 14 Pro Max 128GB",
    quantity: 1,
    price: 27290000,
  },
  {
    id: 3,
    name: "Laptop Dell Inspiron 14 T7430 i5 1335U/8GB/512GB/Touch/Pen/OfficeHS/Win11 (N7430I58W1) ",
    quantity: 1,
    price: 23290000,
  },
];

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "14px !important",
  paddingBottom: "14px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "600 !important",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "400 !important",
}));

const NameContainer = styled.div({
  overflow: "hidden",
});
function ListItemsInDetails(props) {
  return (
    <Stack
      d
      sx={{
        borderRadius: "15px",
        paddingTop: 2,
      }}
    >
      <BoxStyle>
        <TieuDe>Danh sách sản phẩm</TieuDe>
      </BoxStyle>
      <BoxStyle
        sx={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <TieuDeCot>SẢN PHẨM</TieuDeCot>
          </Grid>
          <Grid item xs={3}>
            <TieuDeCot>SỐ LƯỢNG</TieuDeCot>
          </Grid>
          <Grid item xs={3}>
            <TieuDeCot>TỔNG TIỀN</TieuDeCot>
          </Grid>
        </Grid>
      </BoxStyle>
      {Items.map((item) => (
        <BoxStyle key={item.id}>
          <Grid container>
            <Grid item xs={6}>
              <NameContainer>
                <TieuDeCot
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "95%",
                  }}
                >
                  {item.name}
                </TieuDeCot>
              </NameContainer>
            </Grid>

            <Grid item xs={3}>
              <NoiDung>{item.quantity}</NoiDung>
            </Grid>
            <Grid item xs={3}>
              <NoiDung>
                <FormatCurrency amount={item.price} />
              </NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
      ))}
    </Stack>
  );
}

export default ListItemsInDetails;
