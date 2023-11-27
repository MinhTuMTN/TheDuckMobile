import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "14px !important",
  paddingBottom: "14px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const labels = ["22/10", "23/10", "24/10", "25/10", "26/10", "27/10", "28/10"];
const data = [200000, 300000, 400000, 500000, 600000, 500000, 800000];

function RevenueChart(props) {
  return (
    <>
      <BoxStyle
        component={Stack}
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        sx={{
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701014001/poll_klu0kd.png"
          }
          alt="top-product"
          style={{
            width: "25px",
            height: "25px",
            objectFit: "contain",
          }}
        />
        <TieuDe>Biểu đồ doanh thu</TieuDe>
      </BoxStyle>
      <BoxStyle>
        <LineChart
          xAxis={[{ scaleType: "point", data: labels }]}
          series={[{ data: data, label: "Doanh thu" }]}
          height={350}
          sx={{
            padding: "1rem",
          }}
        />
      </BoxStyle>
    </>
  );
}

export default RevenueChart;
