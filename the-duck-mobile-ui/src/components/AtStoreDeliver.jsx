import styled from "@emotion/styled";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchSelect from "./SearchSelect";
const Wrapped = styled(Paper)`
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #838080;
  padding: 1rem;
  border-radius: 4px;
`;
function AtStoreDeliver(props) {
  const [storeAddress, setStoreAddress] = useState("store1");
  const handleChangeStoreAddress = (event) => {
    setStoreAddress(event.target.value);
  };

  return (
    <Wrapped elevation={1}>
      <FormHelperText
        sx={{
          marginBottom: "0.5rem",
        }}
      >
        Chọn địa chỉ cửa hàng:
      </FormHelperText>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SearchSelect label={"Thành phố"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SearchSelect label={"Quận/huyện"} />
        </Grid>
      </Grid>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={storeAddress}
          onChange={handleChangeStoreAddress}
        >
          <FormControlLabel
            label={
              <Typography style={{ fontSize: "14px" }}>Cửa hàng 1</Typography>
            }
            value="store1"
            control={<Radio size="small" />}
          />
          <FormControlLabel
            label={
              <Typography style={{ fontSize: "14px" }}>Cửa hàng 2</Typography>
            }
            value="store2"
            control={<Radio size="small" />}
          />
        </RadioGroup>
      </FormControl>
    </Wrapped>
  );
}

export default AtStoreDeliver;
