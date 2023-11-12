import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropTypes from "prop-types";

SearchSeller.prototype = {
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
};

function SearchSeller(props) {
  const { borderRadius, borderTopLeftRadius, borderTopRightRadius } = props;
  return (
    <Box
      sx={{
        padding: 2,
        borderTopLeftRadius: { borderTopLeftRadius },
        borderTopRightRadius: { borderTopRightRadius },
        borderRadius: { borderRadius },
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <TextField
        variant="standard"
        fullWidth
        size="medium"
        sx={{
          fontSize: "14px",
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Tìm kiếm sản phẩm"
      />
    </Box>
  );
}

export default SearchSeller;
