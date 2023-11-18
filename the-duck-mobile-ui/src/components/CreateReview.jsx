import {
  Button,
  FormHelperText,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function CreatReview(props) {
  const { value, onChange } = props;
  return (
    <Stack spacing={2.5} width={"100%"} direction={"column"}>
      <Typography variant="h5">Tạo đánh giá mới</Typography>
      <Stack direction={"row"} spacing={1.2}>
        <FormHelperText sx={{ marginRight: 2 }}>Đánh giá:</FormHelperText>
        <Rating
          name="rating-request"
          precision={0.5}
          size="small"
          value={value.rating}
          onChange={(e, value) => onChange({ ...value, rating: value })}
        />
      </Stack>
      {/* <Stack direction={"row"} spacing={1.2}>
        <Box flexBasis={"65%"}>
          <MuiTextFeild required label="Họ tên" fontSize={14} fullWidth />
        </Box>
        <Box flexBasis={"35%"}>
          <MuiTextFeild required label="Số điện thoại" fontSize={14} />
        </Box>
      </Stack> */}
      <TextField
        multiline
        label="Cảm nhận của bạn"
        rows={4}
        value={value.comment}
        onChange={(e) => onChange({ ...value, comment: e.target.value })}
      />
      <Button
        variant="contained"
        color="color1"
        size="large"
        sx={{
          color: "#fff",
        }}
        onClick={props.onSubmit}
      >
        Gửi
      </Button>
    </Stack>
  );
}

export default CreatReview;
