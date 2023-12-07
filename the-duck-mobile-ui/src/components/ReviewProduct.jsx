import { Grid, Stack } from "@mui/material";
import React from "react";
import ReviewItem from "./ReviewItem";
import CreateReview from "./CreateReview";
import PropTypes from "prop-types";
import { useAuth } from "../auth/AuthProvider";
import RequireLogin from "./RequireLogin";
import { createVote } from "../services/VoteServices";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

ReviewProduct.propTypes = {
  reviews: PropTypes.array,
};

function ReviewProduct(props) {
  const { reviews, setReviews, setRate, rate } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useAuth();
  const { search } = useLocation();
  const [reviewRequest, setReviewRequest] = React.useState({
    rating: 0,
    comment: "",
  });
  const handleSubmitReview = async () => {
    if (reviewRequest.rate === 0) {
      enqueueSnackbar("Vui lòng đánh giá", { variant: "error" });
      return;
    }

    if (!reviewRequest.comment || reviewRequest.comment === "") {
      enqueueSnackbar("Vui lòng nhập cảm nhận của bạn", { variant: "error" });
      return;
    }

    const response = await createVote(search.split("=")[1], reviewRequest);
    if (response.success) {
      enqueueSnackbar("Đánh giá thành công", { variant: "success" });
      const totalRating = response.data.data.reduce((acc, item) => acc + item.rate, 0);
      const averageRating = response.data.data.length > 0 ? totalRating / response.data.data.length : 0;
      setRate(parseFloat(averageRating))
      setReviewRequest({
        rate: 0,
        comment: "",
      });
      setReviews(response.data.data);
    } else {
      enqueueSnackbar("Đánh giá thất bại", { variant: "error" });
    }
  };

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
        {reviews.map((review, index) => (
          <ReviewItem key={`review-${index}`} review={review} />
        ))}
      </Grid>
      <Grid item xs={12} md={5.5} component={Stack}>
        {!token ? (
          <RequireLogin />
        ) : (
          <CreateReview
            value={reviewRequest}
            onChange={setReviewRequest}
            onSubmit={handleSubmitReview}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default ReviewProduct;
