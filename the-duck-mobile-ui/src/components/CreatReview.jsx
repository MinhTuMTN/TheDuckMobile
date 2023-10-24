import {
  Box,
  Button,
  FormHelperText,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MuiTextFeild from "./MuiTextFeild";

function CreatReview(props) {
  return (
    <Stack spacing={2.5} width={"100%"} direction={"column"}>
      <Typography variant="h5">Tạo đánh giá mới</Typography>
      <Stack direction={"row"} spacing={1.2}>
        <FormHelperText marginRight={2}>Đánh giá:</FormHelperText>
        <Rating name="rating" precision={0.5} size="small" value={5} />
      </Stack>
      <Stack direction={"row"} spacing={1.2}>
        <Box flexBasis={"65%"}>
          <MuiTextFeild required label="Họ tên" fontSize={14} />
        </Box>
        <Box flexBasis={"35%"}>
          <MuiTextFeild required label="Số điện thoại" fontSize={14} />
        </Box>
      </Stack>
      <TextField multiline label="Cảm nhận của bạn" rows={4} />
      <Button
        variant="contained"
        color="color1"
        size="large"
        sx={{
          color: "#fff",
        }}
      >
        Gửi
      </Button>
    </Stack>
  );
}

export default CreatReview;
