import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ListItemsInDetails from "../../../components/Admin/ListItemsInDetails";
import { useLocation, useNavigate } from "react-router-dom";
import OrderDetails from "../../../components/Admin/OrderDetails";
import { getOrderById } from "../../../services/Admin/OrderService";
import FormatDateTime from "../../../components/FormatDateTime";

function OrderDetailPage(props) {
  const { state } = useLocation();
  const pathSegs = state.prevURL.split("/");
  const navigate = useNavigate();
  const [order, setOrder] = useState({});

  const handleGetOrder = useCallback(async () => {
    const response = await getOrderById(state.id);
    if (response.success) {
      setOrder(response.data.data);
    }
  }, [state.id]);

  useEffect(() => {
    handleGetOrder();
  }, [handleGetOrder]);
  return (
    <Box
      sx={{
        pt: 3,
        paddingBottom: 10,
        paddingX: 3,
        margin: "auto",
        minWidth: "1200px",
      }}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            marginBottom={3}
          >
            <IconButton
              aria-label="back"
              size="small"
              padding="0"
              margin="0"
              color="#111927"
              onClick={() => {
                pathSegs[pathSegs.length - 1] !== "order-management"
                  ? navigate(state.prevURL, {
                    state: {
                      id: pathSegs[pathSegs.length - 1],
                    },
                  })
                  : navigate(state.prevURL);
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight={600}
              style={{
                fontSize: "14px",
                color: "#111927",
              }}
            >
              {pathSegs[pathSegs.length - 1] !== "order-management" ?
                "Thông tin khách hàng" : "Danh sách đơn hàng"}
            </Typography>
          </Stack>
          <Typography
            variant="h3"
            fontWeight={600}
            style={{
              textTransform: "uppercase",
              fontSize: "2rem",
            }}
          >
            {order.orderId}
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography
              variant="body1"
              fontWeight={400}
              style={{
                fontSize: "14px",
              }}
            >
              Đặt lúc{" "}
            </Typography>
            <CalendarTodayOutlinedIcon
              sx={{
                fontSize: "20px",
              }}
            />
            <Typography
              variant="body1"
              fontWeight={450}
              style={{
                fontSize: "14px",
              }}
            >
              <FormatDateTime dateTime={order.createdAt} />
            </Typography>
          </Stack>

          <Stack
            component={Paper}
            elevation={3}
            sx={{
              marginTop: 4,
              borderRadius: "15px",
            }}
            spacing={"2px"}
          >
            <OrderDetails order={order} />
          </Stack>
          <Stack
            component={Paper}
            elevation={3}
            sx={{
              marginTop: 4,
              borderRadius: "15px",
            }}
            spacing={"2px"}
          >
            <ListItemsInDetails items={order.orderItems} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default OrderDetailPage;
