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
import UserAddAddress from "./UserAddAddress";

const Wrapped = styled(Paper)`
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #838080;
  padding: 1rem;
  border-radius: 4px;
`;

function ListCustomerAddress(props) {
  const {
    addresses,
    onChangeAddress,
    onChangeSelectedAddress,
    selectedAddress,
  } = props;
  const [customerAddress, setCustomerAddress] = React.useState("store1");
  const handleChangeStoreAddress = (event) => {
    setCustomerAddress(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

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
            {addresses.map((option, index) => (
              <FormControlLabel
                checked={selectedAddress.addressId === option.addressId}
                onChange={() => {
                  onChangeSelectedAddress(option);
                }}
                key={option.addressId}
                label={
                  <Typography
                    style={{ fontSize: "14px" }}
                  >{`${option.street}, ${option.wardName}, ${option.districtName}, ${option.provinceName}`}</Typography>
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
          onClick={() => setOpen(true)}
        >
          Thêm địa chỉ mới
        </Typography>

        <UserAddAddress
          onChangeAddress={onChangeAddress}
          open={open}
          setOpen={setOpen}
        />
      </Stack>
    </Wrapped>
  );
}

export default ListCustomerAddress;
