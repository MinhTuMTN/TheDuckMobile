import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";

function ConsigneeInformation(props) {
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
            Nguyễn Văn A
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
            Siêu thị 583 Trần Phú, Phường B'Lao, Thành phố Bảo Lộc, Tỉnh Lâm
            Đồng
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
            Trước 21:58 - Thứ Bảy (18/12)
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ConsigneeInformation;
