import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
function SearchSeller(props) {
  return (
    <Box
      sx={{
        padding: 2,
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
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
