import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import pic from "../assets/iphone.jpg";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Unit from "./Unit";
function OrderHistoryItem(props) {
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
              #SH21120495035
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={0} alignItems={"center"}>
            <LocalShippingIcon style={{ color: "#047713" }} />
            <Typography
              variant={"h6"}
              fontWeight={"500"}
              style={{
                paddingLeft: "0.5rem",
                color: "#047713",
                fontSize: "16px",
              }}
            >
              Đã nhận hàng
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} flexBasis={"60%"}>
            <img src={pic} alt="product" width={"10%"} />
            <Typography
              variant="body1"
              fontWeight={"500"}
              style={{
                fontSize: "16px",
                marginLeft: "0.5rem",
              }}
            >
              Iphone 15 Pro Max
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
              fontWeight={"500"}
              style={{
                fontSize: "18px",
              }}
            >
              40.000.000
            </Typography>
            <Unit />
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#141E46",
              ":hover": {
                backgroundColor: "#141E46",
                color: "#fff",
              },
            }}
          >
            Chi tiết
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default OrderHistoryItem;
