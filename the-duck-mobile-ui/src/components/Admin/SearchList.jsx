import React, { useCallback, useEffect } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropTypes from "prop-types";

SearchList.prototype = {
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
};

function SearchList(props) {
  const
  {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    placeholder,
    searchString,
    setRowsSearched,
    dataFetched,
    setSearchString
  } = props;

  const filterRows = useCallback(
    (searchString) => {
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.brandName.toLowerCase().includes(searchString.toLowerCase())
      );
    },
    [dataFetched]
  );

  useEffect(() => {
    const filtered = filterRows(searchString);
    setRowsSearched(filtered);
  }, [searchString, filterRows, setRowsSearched]);
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
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
      />
    </Box>
  );
}

export default SearchList;
