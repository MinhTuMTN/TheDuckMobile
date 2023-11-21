import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import MuiTextFeild from "./MuiTextFeild";
import PropTypes from "prop-types";

NewCustomerInfomation.propTypes = {
  info: PropTypes.object,
  onChange: PropTypes.func,
};

NewCustomerInfomation.defaultProps = {
  info: {},
  onChange: () => {},
};

function NewCustomerInfomation(props) {
  const { info, onChange } = props;
  const handleChange = (newInfo) => {
    onChange(newInfo);
  };
  return (
    <>
      <FormControl>
        <RadioGroup row name="row-radio-buttons-group">
          <FormControlLabel
            value="female"
            className="custom-radio"
            control={<Radio size="small" />}
            label={<span style={{ fontSize: "14px" }}>Anh</span>}
            checked={info?.gender === 0}
            onChange={(e) => {
              handleChange({ ...info, gender: 0 });
            }}
          />
          <FormControlLabel
            value="male"
            control={<Radio size="small" />}
            label={<span style={{ fontSize: "14px" }}>Chị</span>}
            checked={info?.gender === 1}
            onChange={(e) => {
              handleChange({ ...info, gender: 1 });
            }}
          />
        </RadioGroup>
      </FormControl>
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={7}>
          <MuiTextFeild
            required
            variant="outlined"
            fullWidth
            label="Họ tên"
            size="medium"
            fontSize={"14px"}
            value={info && info.name}
            onChange={(e) => {
              handleChange({ ...info, name: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <MuiTextFeild
            required
            variant="outlined"
            fullWidth
            label="Số điện thoại"
            size="medium"
            fontSize={"14px"}
            value={info && info.phone}
            onChange={(e) => handleChange({ ...info, phone: e.target.value })}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default NewCustomerInfomation;
