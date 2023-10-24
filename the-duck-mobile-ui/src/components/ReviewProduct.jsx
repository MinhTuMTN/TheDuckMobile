import {
  Avatar,
  Box,
  FormHelperText,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MuiTextFeild from "./MuiTextFeild";

function ReviewProduct(props) {
  return (
    <Grid spacing={7} container>
      <Grid item xs={12} md={7} component={Stack}>
        <Stack direction={"row"} spacing={1.75}>
          <Avatar
            sx={{
              height: "3.5rem",
              width: "3.5rem",
            }}
          />
          <Stack direction={"column"} spacing={1.2}>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography
                variant="h6"
                fontWeight={450}
                style={{
                  fontSize: "18px",
                }}
                marginRight={3}
              >
                Nguyễn Ngọc Tuyết Vi
              </Typography>
              <Rating
                name="rating"
                precision={0.5}
                size="small"
                readOnly
                value={4.5}
              />
            </Stack>
            <Typography
              variant="body2"
              style={{
                fontSize: "14px",
                textAlign: "justify",
              }}
            >
              Vestibulum ante ipsum primis aucibus orci luctustrices posuere
              cubilia Curae Suspendisse viverra ed viverra. Mauris ullarper
              euismod vehicula. Phasellus quam nisi, congue id nulla.
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5} component={Stack}>
        <Stack spacing={1.2} direction={"column"}>
          <Typography variant="h5">Tạo đánh giá mới</Typography>
          <Stack direction={"row"} spacing={1.2}>
            <FormHelperText marginRight={2}>Đánh giá:</FormHelperText>
            <Rating name="rating" precision={0.5} size="small" value={5} />
          </Stack>
          <Stack direction={"row"} spacing={1.2}>
            <Box flexBasis={"70%"}>
              <MuiTextFeild required label="Họ tên" />
            </Box>
            <Box flexBasis={"30%"}>
              <MuiTextFeild required label="Số điện thoại" />
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ReviewProduct;