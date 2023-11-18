import { Avatar, Rating, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

ReviewItem.propTypes = {
  review: PropTypes.object,
};

function ReviewItem(props) {
  const { review } = props;
  return (
    <Stack direction={"row"} spacing={1.75}>
      <Avatar
        sx={{
          height: "3.5rem",
          width: "3.5rem",
        }}
      />
      <Stack direction={"column"} spacing={1.2}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            variant="h6"
            fontWeight={450}
            style={{
              fontSize: "18px",
            }}
            marginRight={3}
          >
            {review.userName}
          </Typography>
          <Rating
            name="rating"
            precision={0.5}
            size="small"
            readOnly
            value={review.rate}
          />
        </Stack>
        <Typography
          variant="body2"
          style={{
            fontSize: "14px",
            textAlign: "justify",
          }}
        >
          {review.comment}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ReviewItem;
