import { Autocomplete } from "@mui/material";
import React from "react";
import MuiTextFeild from "./MuiTextFeild";
import PropTypes from "prop-types";

SearchSelect.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

// Default options
SearchSelect.defaultProps = {
  disabled: false,
};

const options = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  // Thêm các mục khác vào đây
];

function SearchSelect(props) {
  const { label } = props;
  return (
    <Autocomplete
      size="small"
      disabled={props.disabled}
      style={{
        fontSize: "14px",
      }}
      onChange={props.onChange}
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <MuiTextFeild {...params} label={label} fontSize={"14px"} />
      )}
    />
  );
}

export default SearchSelect;
