import { Grid, Stack } from "@mui/material";
import React from "react";
import ReviewItem from "./ReviewItem";
import CreatReview from "./CreatReview";

function ReviewProduct(props) {
  return (
    <Grid spacing={7} container>
      <Grid
        item
        xs={12}
        md={6.5}
        component={Stack}
        direction={"column"}
        wrap="nowrap"
        gap={4}
      >
        <ReviewItem />
        <ReviewItem />
      </Grid>
      <Grid item xs={12} md={5.5} component={Stack}>
        <CreatReview />
      </Grid>
    </Grid>
  );
}

export default ReviewProduct;
