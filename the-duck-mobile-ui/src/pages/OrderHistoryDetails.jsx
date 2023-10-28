import { Stack } from "@mui/material";
import React from "react";
import ConsigneeInformation from "../components/ConsigneeInformation";
import PaymentMenthod from "../components/PaymentMenthod";
import AboutHistoryOrderDetails from "../components/AboutHistoryOrderDetails";

function OrderHistoryDetails(props) {
  return (
    <Stack direction={"column"} spacing={2}>
      <Stack direction={"row"} spacing={2}>
        <ConsigneeInformation />
        <PaymentMenthod />
      </Stack>
      <AboutHistoryOrderDetails />
    </Stack>
  );
}

export default OrderHistoryDetails;
