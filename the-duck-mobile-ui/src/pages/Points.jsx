import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import MuiTextFeild from "../components/MuiTextFeild";

function Points(props) {
  const points = 10000;
  const [exchangePoints, setExchangePoints] = React.useState(0);
  return (
    <Stack>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Điểm tích lũy
      </Typography>

      <Typography variant="body1" mt={2}>
        Số điểm tích lũy hiện tại của bạn là: {points.toLocaleString("vn")} điểm
      </Typography>

      <Stack mt={2}>
        <Typography variant="body1" mt={2} fontWeight={"bold"}>
          Qui đổi điểm tích lũy: (1 điểm = 1 VNĐ)
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9}>
            <MuiTextFeild
              fullWidth
              size={"small"}
              value={exchangePoints}
              onChange={(e) => {
                let nums = e.target.value.replace(/,/g, "");
                if (nums === "") nums = "0";
                if (!nums || nums.endsWith(".")) return;
                const value = parseFloat(nums).toLocaleString("vn");
                setExchangePoints(value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" fullWidth>
              Qui đổi
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default Points;
