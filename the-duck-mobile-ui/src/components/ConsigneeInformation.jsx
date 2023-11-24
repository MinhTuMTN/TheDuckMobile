import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Card, Stack, Typography } from "@mui/material";
import React from "react";

const days = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

function ConsigneeInformation(props) {
  const { orderDetails } = props;
  const dateReceive = new Date(orderDetails?.order?.createdAt);
  dateReceive.setDate(dateReceive.getDate() + 2);

  const formatDate = () => {
    return `${dateReceive.getDate()}/${
      dateReceive.getMonth() + 1
    }/${dateReceive.getFullYear()}`;
  };

  return (
    <Card
      sx={{
        padding: "0.75rem",
        borderRadius: "0.25rem",
        border: "1px solid #222121",
        width: "65%",
      }}
    >
      <Stack direction={"column"} spacing={1}>
        <Stack direction={"row"} spacing={0.5}>
          <PersonPinIcon />
          <Typography
            variant={"h6"}
            style={{
              fontSize: "14px",
            }}
          >
            THÔNG TIN NGƯỜI NHẬN HÀNG
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={0.5}>
          <Typography
            variant={"body1"}
            style={{
              fontSize: "14px",
              width: "20%",
            }}
          >
            Người nhận:{" "}
          </Typography>
          <Typography
            variant={"body1"}
            style={{
              fontSize: "14px",
              width: "80%",
            }}
          >
            {orderDetails?.receiverName}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={0.5}>
          <Typography
            variant={"body1"}
            style={{
              fontSize: "14px",
              width: "20%",
            }}
          >
            Nhận tại:{" "}
          </Typography>
          <Typography
            variant={"body1"}
            style={{
              fontSize: "14px",
              flexWrap: "wrap",
              width: "80%",
            }}
          >
            {`${orderDetails?.address?.street}, ${orderDetails?.address?.wardName}, ${orderDetails?.address?.districtName}, ${orderDetails?.address?.provinceName}`}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={0.5}>
          <Typography
            variant={"body1"}
            style={{
              fontSize: "14px",
              width: "20%",
            }}
          >
            Nhận lúc:{" "}
          </Typography>
          <Typography
            variant={"body1"}
            style={{
              fontSize: "14px",
              flexWrap: "wrap",
              width: "80%",
            }}
          >
            Trước {dateReceive.getHours()}:{dateReceive.getMinutes()} -{" "}
            {days[dateReceive.getDay()]} ({formatDate()})
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ConsigneeInformation;
