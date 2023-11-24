import styled from "@emotion/styled";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FormatCurrency from "../FormatCurrency";

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
  textAlign: "center",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "400 !important",
  textAlign: "right",
}));

const NameContainer = styled.div({
  overflow: "hidden",
});

function ListItemsInDetails(props) {
  const { items } = props;
  return (
    <Stack
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
          <Grid item xs={2}>
            <TieuDeCot style={{ textAlign: "left" }}>ĐƠN GIÁ</TieuDeCot>
          </Grid>
          <Grid item xs={1}>
            <TieuDeCot>SỐ LƯỢNG</TieuDeCot>
          </Grid>
          <Grid item xs={3}>
            <TieuDeCot>TỔNG TIỀN</TieuDeCot>
          </Grid>
        </Grid>
      </BoxStyle>
      {items?.map((item, index) => (
        <BoxStyle key={index}>
          <Grid container>
            <Grid item xs={6}>
              <NameContainer>
                <TieuDeCot
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "95%",
                    textAlign: "left",
                  }}
                >
                  {item?.productName}
                  {" - "}
                  {item?.versionName}
                </TieuDeCot>
              </NameContainer>
            </Grid>
            <Grid item xs={2}>
              <NoiDung style={{ textAlign: "left" }}>
                <FormatCurrency amount={item.price} />
              </NoiDung>
            </Grid>
            <Grid item xs={1}>
              <NoiDung style={{ textAlign: "center" }}>{item.quantity}</NoiDung>
            </Grid>
            <Grid item xs={3}>
              <NoiDung>
                <FormatCurrency amount={item.total} />
              </NoiDung>
            </Grid>
          </Grid>
        </BoxStyle>
      ))}
    </Stack>
  );
}

export default ListItemsInDetails;
