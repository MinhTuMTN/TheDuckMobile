import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import PaymentIcon from "@mui/icons-material/Payment";

function PaymentMenthod(props) {
  return (
    <Card
      sx={{
        padding: "0.75rem",
        borderRadius: "0.25rem",
        border: "1px solid #222121",
        width: "35%",
      }}
    >
      <Stack direction={"column"} spacing={1}>
        <Stack direction={"row"} spacing={0.5}>
          <PaymentIcon />
          <Typography
            variant={"h6"}
            style={{
              fontSize: "14px",
            }}
          >
            PHƯƠNG THỨC THANH TOÁN
          </Typography>
        </Stack>

        <Typography
          variant={"body1"}
          style={{
            fontSize: "14px",
            width: "100%",
          }}
        >
          Thanh toán khi nhận hàng.
        </Typography>
      </Stack>
    </Card>
  );
}

export default PaymentMenthod;
