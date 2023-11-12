import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BasicDetails from "../../components/Store/BasicDetails";
import ListItemsInDetails from "../../components/Store/ListItemsInDetails";

function OrderDetails(props) {
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
              Danh sách đơn hàng
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
            ĐH - vv1be10cb
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
              20/10/2021 10:00
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
            <BasicDetails />
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
            <ListItemsInDetails />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default OrderDetails;
