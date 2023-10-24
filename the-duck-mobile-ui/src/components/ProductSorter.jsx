import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

ProductSorter.propTypes = {
  onSort: PropTypes.func,
  value: PropTypes.number,
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
          color={value === 1 ? "color1" : "color4"}
          onClick={(e) => onSort(1)}
        >
          Giá tăng dần
        </Button>
        <Button
          variant="outlined"
          color={value === 2 ? "color1" : "color4"}
          onClick={(e) => onSort(2)}
        >
          Giá giảm dần
        </Button>
        <Button
          variant="outlined"
          color={value === 3 ? "color1" : "color4"}
          onClick={(e) => onSort(3)}
        >
          Bán chạy
        </Button>
      </Stack>
    </Box>
  );
}

export default ProductSorter;
