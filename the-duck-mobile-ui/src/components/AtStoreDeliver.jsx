import styled from "@emotion/styled";
import { FormHelperText, Grid, Paper } from "@mui/material";
import React from "react";
import SearchSelect from "./SearchSelect";
import MuiTextFeild from "./MuiTextFeild";
const Wrapped = styled(Paper)`
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #838080;
  padding: 1rem;
  border-radius: 4px;
`;
function AtStoreDeliver(props) {
  return (
    <Wrapped elevation={1}>
      <FormHelperText
        sx={{
          marginBottom: "0.5rem",
        }}
      >
        Chọn địa chỉ nhận hàng của bạn:
      </FormHelperText>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SearchSelect label={"Thành phố"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SearchSelect label={"Quận/huyện"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SearchSelect label={"Phường/xã"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiTextFeild label={"Địa chỉ"} size={"small"} />
        </Grid>
      </Grid>
    </Wrapped>
  );
}

export default AtStoreDeliver;
