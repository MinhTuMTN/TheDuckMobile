import { Box, Rating } from "@mui/material";
import React, { memo } from "react";
import PropTypes from "prop-types";

ProductDetailsRating.propTypes = {
  rating: PropTypes.number,
  numReviews: PropTypes.number,
};

ProductDetailsRating.defaultProps = {
  rating: 0,
  numReviews: 0,
};

function ProductDetailsRating(props) {
  const { rating, numReviews } = props;
  return (
    <Box
      marginBottom={"2rem"}
      display={"flex"}
      alignItems={"center"}
      borderLeft={"1px solid #cbcaca"}
      paddingLeft={"10px"}
    >
      <Rating
        name="rating"
        precision={0.1}
        size="medium"
        value={rating ? rating : 0}
        readOnly
      />
      <span style={{ marginLeft: "10px" }}>({numReviews} Reviews)</span>
    </Box>
  );
}

export default memo(ProductDetailsRating);
