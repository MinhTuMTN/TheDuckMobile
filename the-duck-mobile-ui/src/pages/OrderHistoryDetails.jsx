import { Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ConsigneeInformation from "../components/ConsigneeInformation";
import PaymentMenthod from "../components/PaymentMenthod";
import AboutHistoryOrderDetails from "../components/AboutHistoryOrderDetails";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../services/OrderService";

function OrderHistoryDetails(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const handleGetOrderDetails = useCallback(async () => {
    const orderId = searchParams.get("orderId");
    if (!orderId) return;

    const response = await getOrderById(orderId);
    if (response.success) setOrderDetails(response.data.data);
    else navigate("/not-found", { replace: true });
  }, [navigate, searchParams]);

  useEffect(() => {
    handleGetOrderDetails();
  }, [handleGetOrderDetails]);

  console.log(orderDetails);
  return (
    <Stack direction={"column"} spacing={2}>
      <Stack direction={"row"} spacing={2}>
        <ConsigneeInformation orderDetails={orderDetails} />
        <PaymentMenthod />
      </Stack>
      <AboutHistoryOrderDetails orderDetails={orderDetails} />
    </Stack>
  );
}

export default OrderHistoryDetails;
