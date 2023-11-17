import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

ProductSorter.propTypes = {
  onSort: PropTypes.func,
  value: PropTypes.string,
};

function ProductSorter(props) {
  const { onSort, value } = props;
  return (
    <Box marginTop={3}>
      <Typography variant="h5" component="h2" mb={1}>
        Sắp xếp theo
      </Typography>
      <Divider />
      <Stack direction={"row"} spacing={1} mt={1}>
        <Button
          variant="outlined"
          color={value === "price_asc" ? "color1" : "color4"}
          onClick={(e) => onSort("price_asc")}
        >
          Giá tăng dần
        </Button>
        <Button
          variant="outlined"
          color={value === "price_desc" ? "color1" : "color4"}
          onClick={(e) => onSort("price_desc")}
        >
          Giá giảm dần
        </Button>
        <Button
          variant="outlined"
          color={value === "best_seller" ? "color1" : "color4"}
          onClick={(e) => onSort("best_seller")}
        >
          Bán chạy
        </Button>
      </Stack>
    </Box>
  );
}

export default ProductSorter;
