import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import RevenueChartStore from "../../components/Store/RevenueChartStore";
import OptionsInAnalyticPageStore from "../../components/Store/OptionsInAnalyticPageStore";
import OrdersPieChart from "../../components/Store/OrdersPieChart";
import { getAllStatistic } from "../../services/Store/StatisticService";
import { enqueueSnackbar } from "notistack";

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

function AnalyticsStore(props) {
  const theme = useTheme();
  const isFullWidth = useMediaQuery(theme.breakpoints.up("md"));
  const spacingValue = isFullWidth ? 4 : 0;
  const [statisticData, setStatisticData] = useState({});

  const handleGetAllStatistics = useCallback(async () => {
    const response = await getAllStatistic();

    if (response.success) {
      setStatisticData(response.data.data);
    }
    else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, []);

  useEffect(() => {
    handleGetAllStatistics();
  }, [handleGetAllStatistics]);

  return (
    <Box component={"main"} sx={{ flexGrow: 1, pt: 0, pb: 4 }}>
      <Container>
        <Stack direction={"column"} spacing={4} width={"100%"}>
          <Stack direction={"column"} width={"100%"}>
            <Typography
              variant="h3"
              fontWeight={600}
              style={{
                textTransform: "uppercase",
                fontSize: "2rem",
              }}
            >
              Thống kê
            </Typography>

            <Grid container spacing={spacingValue}>
              <Grid item xs={12} md={8}>
                <OptionsInAnalyticPageStore statisticData={statisticData} />
                <Stack component={Paper} elevation={3} sx={paperStyle}>
                  <Stack
                    sx={{
                      borderRadius: "10px",
                      paddingTop: 0,
                    }}
                  >
                    <RevenueChartStore statisticData={statisticData} />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <OrdersPieChart pieChartData={statisticData.pieChartStatistics} />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default AnalyticsStore;
