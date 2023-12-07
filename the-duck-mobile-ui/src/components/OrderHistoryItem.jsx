import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ColorButton from "./ColorButton";
import FormatCurrency from "./FormatCurrency";
import { useNavigate } from "react-router";
import { cancelOrder } from "../services/OrderService";
import { enqueueSnackbar } from "notistack";
import DialogForm from "./DialogForm";

function OrderHistoryItem(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { order } = props;
  const orderState = [
    "Chờ xác nhận",
    "Đang xử lý",
    "Đang giao hàng",
    "Đã giao hàng",
    "Đã hủy",
  ];

  const handleCancel = async () => {
    const response = await cancelOrder(order.orderId);
    if (response.success) {
      enqueueSnackbar("Hủy đơn hàng thành công", { variant: "success" });
      navigate(0);
    } else {
      enqueueSnackbar("Hủy đơn hàng thất bại", { variant: "error" });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "0.5rem",
      }}
    >
      <Stack direction={"column"} margin={"0.75rem"} spacing={1.5}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            borderBottom: "1px solid #E2E2E2",
            paddingBottom: "0.25rem",
          }}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant={"h6"}>Mã đơn hàng: </Typography>
            <Typography
              variant={"body1"}
              fontWeight={"400"}
              style={{
                fontSize: "16px",
              }}
            >
              {order.orderId}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={0} alignItems={"center"}>
            <LocalShippingIcon
              style={{ color: order.orderState === 4 ? "#FF0000" : "#047713" }}
            />
            <Typography
              variant={"h6"}
              fontWeight={"500"}
              style={{
                paddingLeft: "0.5rem",
                color: order.orderState === 4 ? "#FF0000" : "#047713",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {orderState[order.orderState]}
            </Typography>
          </Stack>
        </Stack>

        {order?.orderItems?.map((item, index) => (
          <Stack
            direction={"row"}
            spacing={1}
            key={`order-${order.orderId}-${index}`}
            alignItems={"center"}
          >
            <Stack direction={"row"} flexBasis={"60%"} marginBottom={1}>
              <img src={item.thumbnail} alt="product" width={"15%"} />
              <Stack direction={"column"} spacing={0.5}>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  style={{
                    fontSize: "16px",
                    marginLeft: "0.5rem",
                  }}
                >
                  {item.productName}
                </Typography>
                <Stack direction={"row"} spacing={1}>
                  <Typography
                    variant="body1"
                    fontWeight={"500"}
                    style={{
                      fontSize: "16px",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Màu: {item?.colorName}
                  </Typography>
                  <ColorButton
                    color={item?.colorCode}
                    width="1rem"
                    height="1rem"
                  />
                  <Typography
                    variant="body1"
                    fontWeight={"500"}
                    style={{
                      fontSize: "16px",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Phân loại: {item?.versionName}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              alignItems={"flex-end"}
              flexBasis={"40%"}
              justifyContent={"flex-end"}
            >
              {item?.promotionPrice > 0 &&
                item?.promotionPrice < item?.price && (
                  <Typography
                    variant="body1"
                    fontWeight={"500"}
                    style={{
                      fontSize: "14px",
                      textDecoration: "line-through",
                    }}
                  >
                    <FormatCurrency amount={item?.price} />
                  </Typography>
                )}
              <Typography
                variant="body1"
                fontWeight={"500"}
                style={{
                  fontSize: "16px",
                }}
              >
                <FormatCurrency
                  amount={Math.min(item?.price, item?.promotionPrice)}
                />
              </Typography>
            </Stack>
          </Stack>
        ))}
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          flexBasis={"40%"}
          justifyContent={"flex-end"}
        >
          <Typography
            variant="body1"
            fontWeight={"500"}
            style={{
              fontSize: "16px",
            }}
          >
            Phí vận chuyển:
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"500"}
            style={{
              fontSize: "16px",
              minWidth: "8rem",
              textAlign: "right",
            }}
          >
            <FormatCurrency amount={20000} />
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          flexBasis={"40%"}
          justifyContent={"flex-end"}
        >
          <Typography
            variant="body1"
            fontWeight={"500"}
            style={{
              fontSize: "16px",
            }}
          >
            Tổng tiền:
          </Typography>
          <Typography
            variant="body1"
            color={"color1.main"}
            fontWeight={"500"}
            style={{
              fontSize: "16px",
              minWidth: "8rem",
              textAlign: "right",
            }}
          >
            <FormatCurrency amount={order?.totalPrice} />
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: ".5rem",
          }}
        >
          <Button
            variant="outlined"
            color="color1"
            sx={{
              display: order.orderState === 0 ? "block" : "none",
              color: "color1.main",
              ":hover": {
                backgroundColor: "color1.main",
                color: "#fff",
              },
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Hủy
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#141E46",
              ":hover": {
                backgroundColor: "#141E46",
                color: "#fff",
              },
            }}
            onClick={() => {
              navigate(`/profile/order-details?orderId=${order.orderId}`);
            }}
          >
            Chi tiết
          </Button>
        </Box>
      </Stack>
      <DialogForm
        open={open}
        onClose={handleClose}
        title={"Hủy đơn hàng"}
        cancelText={"Hủy"}
        onCancel={handleClose}
        okText={"Xác nhận hủy đơn hàng"}
        content={"Bạn có chắc chắn muốn hủy đơn hàng này?"}
        onOk={handleCancel}
      />
    </Paper>
  );
}

export default OrderHistoryItem;
