import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Wrapped = styled(Paper)`
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #838080;
  padding: 1rem;
  border-radius: 4px;
`;
const options = [
  "403 Nguyễn Thị Đinh, P. Long Thạnh Mỹ, Q. 9, TP. HCM",
  "201 Lê Văn Việt, P. Tăng Nhơn Phú A, Q. 9, TP. HCM",
  "111 Nguyễn Trãi, P. 2, Q. 5, TP. HCM",
  "303 Nguyễn Bỉnh Khiêm, P. Đa Kao, Q. 1, TP. HCM",
];

function ListCustomerAddress(props) {
  const [customerAddress, setCustomerAddress] = React.useState("store1");
  const handleChangeStoreAddress = (event) => {
    setCustomerAddress(event.target.value);
  };
  return (
    <Wrapped elevation={1}>
      <FormHelperText
        sx={{
          marginBottom: "0.5rem",
        }}
      >
        Chọn địa chỉ nhận hàng của bạn:
      </FormHelperText>
      <Stack direction="column" spacing={1}>
        <FormControl
          sx={{
            borderBottom: "1px solid #838080",
            paddingBottom: "0.2rem",
          }}
        >
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={customerAddress}
            onChange={handleChangeStoreAddress}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                label={
                  <Typography style={{ fontSize: "14px" }}>{option}</Typography>
                }
                value={option}
                control={<Radio size="small" />}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Typography
          variant="body2"
          color="text.secondary"
          component={Button}
          width={"fit-content"}
          style={{ fontSize: "14px" }}
          startIcon={<AddCircleOutlineIcon size={"small"} />}
        >
          Thêm địa chỉ mới
        </Typography>
      </Stack>
    </Wrapped>
  );
}

export default ListCustomerAddress;
