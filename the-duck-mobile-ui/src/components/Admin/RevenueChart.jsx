import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import React, { useEffect, useState } from "react";
import { getAllStatistic } from "../../services/Admin/StatisticService";
import { enqueueSnackbar } from "notistack";

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "12px !important",
  paddingRight: "12px !important",
  paddingTop: "7px !important",
  paddingBottom: "7px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "55px",
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "15px",
  height: "2.5rem",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

// const labels = ["22/10", "23/10", "24/10", "25/10", "26/10", "27/10", "28/10"];
// const data = [200000, 300000, 400000, 500000, 600000, 500000, 800000];

function RevenueChart(props) {
  const { statisticData } = props;
  const [labels, setLabels] = useState([""]);
  const [data, setData] = useState([1]);
  const [statisticRequest, setStatisticRequest] = useState({
    startDate: dayjs().add(-30, "day"),
    endDate: dayjs(),
  });
  const [maxStartDate, setMaxStartDate] = useState(dayjs());

  useEffect(() => {
    setLabels(statisticData.labelStatistic);
    setData(statisticData.dataStatistic);
  }, [statisticData]);

  const handleStatistic = async () => {
    const response = await getAllStatistic({
      startDate: new Date(statisticRequest.startDate.format("YYYY-MM-DD")),
      endDate: new Date(statisticRequest.endDate.format("YYYY-MM-DD"))
    });

    if (response.success) {
      setLabels(response.data.data.labelStatistic);
      setData(response.data.data.dataStatistic);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }

  return (
    <>
      <Stack
        direction={"row"}
        spacing={1}
        width={"100%"}
        sx={{
          paddingY: 1,
          paddingX: 2
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="en-gb"
        >
          <CustomDatePicker
            label="Ngày bắt đầu"
            value={dayjs(statisticRequest.startDate)}
            maxDate={maxStartDate}
            onChange={(newDate) => {
              setStatisticRequest((prev) => {
                return {
                  ...prev,
                  startDate: newDate,
                };
              });
            }}
            sx={{ mt: 2 }}
          />
        </LocalizationProvider>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="en-gb"
        >
          <CustomDatePicker
            label="Ngày kết thúc"
            value={dayjs(statisticRequest.endDate)}
            maxDate={dayjs(new Date())}
            onChange={(newDate) => {
              setStatisticRequest((prev) => {
                setMaxStartDate(newDate);
                return {
                  ...prev,
                  endDate: newDate,
                };
              });
            }}
            sx={{ mt: 2 }}
          />
        </LocalizationProvider>
      </Stack>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{
          paddingX: 2
        }}
      >
        <CustomButton
          variant="contained"
          size="medium"
          autoFocus
          onClick={handleStatistic}
        >
          Thống Kê
        </CustomButton>
      </Box >
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
        {labels && <LineChart
          xAxis={[{ scaleType: "point", data: labels }]}
          series={[{ data: data, label: "Doanh thu" }]}
          height={350}
          sx={{
            padding: "1.6rem",
          }}
        />}
      </BoxStyle>
    </>
  );
}

export default RevenueChart;
