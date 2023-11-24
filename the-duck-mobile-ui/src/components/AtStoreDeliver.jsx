import styled from "@emotion/styled";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
const Wrapped = styled(Paper)`
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #838080;
  padding: 1rem;
  border-radius: 4px;
`;
function AtStoreDeliver(props) {
  const { storeAddress, selectedAddress, onStoreAddressChange } = props;

  return (
    <Wrapped elevation={1}>
      <FormHelperText
        sx={{
          marginBottom: "0.5rem",
        }}
      >
        Chọn địa chỉ cửa hàng:
      </FormHelperText>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SearchSelect label={"Thành phố"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SearchSelect label={"Quận/huyện"} />
        </Grid>
      </Grid> */}
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={storeAddress}
        >
          {storeAddress?.map((option, index) => (
            <FormControlLabel
              key={`store-address-${option?.address?.addressId}`}
              label={
                <Typography style={{ fontSize: "14px" }}>
                  {`${option?.address?.street}, ${option?.address?.wardName}, ${option?.address?.districtName}, ${option?.address?.provinceName}`}
                </Typography>
              }
              value={`store-address-${option?.address?.addressId}`}
              control={<Radio size="small" />}
              checked={selectedAddress.addressId === option?.address?.addressId}
              onChange={() => {
                onStoreAddressChange({
                  addressId: option?.address?.addressId,
                  streetName: option?.address?.street,
                  wardId: option?.address?.wardId,
                  storeId: true,
                });
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Wrapped>
  );
}

export default AtStoreDeliver;
