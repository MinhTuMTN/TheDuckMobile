import styled from "@emotion/styled";
import {
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useThemeProps,
} from "@mui/material";
import React from "react";
import { PieChart } from "@mui/x-charts";
import { useTheme } from "@emotion/react";

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

function OrdersPieChart(props) {
  return (
    <Stack component={Paper} elevation={3} sx={paperStyle}>
      <BoxStyle
        component={Stack}
        direction={"row"}
        alignItems={"center"}
        spacing={0.7}
        sx={{
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701048808/pie-chart_y1a57k.png"
          }
          alt="top-product"
          style={{
            width: "30px",
            height: "30px",
            objectFit: "contain",
          }}
        />
        <TieuDe>Thống kê đơn hàng</TieuDe>
      </BoxStyle>
      <BoxStyle2 className="Hello">
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Chờ xác nhận" },
                  { id: 1, value: 15, label: "Đang chuẩn bị" },
                  { id: 2, value: 20, label: "Đang giao" },
                  { id: 3, value: 50, label: "Đã hoàn thành" },
                  { id: 4, value: 5, label: "Bị huỷ" },
                ],
                innerRadius: 50,
              },
            ]}
            width={500}
            height={200}
          />
        </Stack>
      </BoxStyle2>
    </Stack>
  );
}

export default OrdersPieChart;
