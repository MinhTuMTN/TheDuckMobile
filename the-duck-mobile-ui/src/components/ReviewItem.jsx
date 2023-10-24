import { Avatar, Rating, Stack, Typography } from "@mui/material";
import React from "react";

function ReviewItem(props) {
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
            Nguyễn Ngọc Tuyết Vi
          </Typography>
          <Rating
            name="rating"
            precision={0.5}
            size="small"
            readOnly
            value={4.5}
          />
        </Stack>
        <Typography
          variant="body2"
          style={{
            fontSize: "14px",
            textAlign: "justify",
          }}
        >
          Vestibulum ante ipsum primis aucibus orci luctustrices posuere cubilia
          Curae Suspendisse viverra ed viverra. Mauris ullarper euismod
          vehicula. Phasellus quam nisi, congue id nulla.
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ReviewItem;
