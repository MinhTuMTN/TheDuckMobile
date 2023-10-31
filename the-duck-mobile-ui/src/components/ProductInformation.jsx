import { Stack, Typography } from "@mui/material";
import React from "react";
import pic from "../assets/iphone.jpg";
import PropTypes from "prop-types";
import Unit from "./Unit";

ProductInformation.propTypes = {
  color: PropTypes.string,
  fontWeight: PropTypes.string,
};
function ProductInformation(props) {
  const { color, fontWeight } = props;
  return (
    <Stack direction={"row"} spacing={1}>
      <Stack direction={"row"} flexBasis={"60%"}>
        <img src={pic} alt="product" width={"15%"} />
        <Stack
          direction={"column"}
          spacing={0.5}
          justifyContent={"space-between"}
        >
          <Typography
            variant="body1"
            fontWeight={fontWeight}
            style={{
              fontSize: "16px",
              marginLeft: "0.5rem",
            }}
          >
            Iphone 15 Pro Max
          </Typography>
          <Stack direction={"row"}>
            <Typography
              variant="body1"
              fontWeight={"500"}
              style={{
                fontSize: "12px",
                marginLeft: "0.5rem",
              }}
            >
              Màu sắc:{" "}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={"500"}
              style={{
                fontSize: "12px",
                marginLeft: "0.2rem",
                marginRight: "1.5rem",
              }}
            >
              Đen
            </Typography>
            <Typography
              variant="body1"
              fontWeight={"500"}
              style={{
                fontSize: "12px",
                marginLeft: "0.5rem",
              }}
            >
              Số lượng:{" "}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={"500"}
              style={{
                fontSize: "12px",
                marginLeft: "0.2rem",
              }}
            >
              1
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"flex-start"}
        flexBasis={"40%"}
        justifyContent={"flex-end"}
      >
        <Typography
          variant="body1"
          fontWeight={"500"}
          style={{
            fontSize: "16px",
            color: color,
          }}
        >
          40.000.000
        </Typography>
        <Unit color={color} />
      </Stack>
    </Stack>
  );
}

export default ProductInformation;
