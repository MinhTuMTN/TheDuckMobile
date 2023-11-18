import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

ProductDescription.propTypes = {
  desc: PropTypes.string,
};

ProductDescription.defaultProps = {
  desc: "Không có mô tả",
};

function ProductDescription(props) {
  const { desc } = props;
  return (
    <Box
      sx={{
        textAlign: "justify",
      }}
    >
      {desc}
    </Box>
  );
}

export default ProductDescription;
