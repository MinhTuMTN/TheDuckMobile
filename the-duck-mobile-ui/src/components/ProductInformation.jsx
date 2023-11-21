import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import FormatCurrency from "./FormatCurrency";

ProductInformation.propTypes = {
  fontWeight: PropTypes.string,
  product: PropTypes.object,
};
function ProductInformation(props) {
  const { fontWeight, product } = props;
  return (
    <Stack direction={"row"} spacing={1}>
      <Stack direction={"row"} flexBasis={"60%"}>
        <img src={product?.thumbnail} alt="product" width={"25%"} />
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
            {product?.productName}
          </Typography>
          <Stack direction={"row"}>
            <Stack direction={"column"} spacing={0.5}>
              <Stack direction={"row"} spacing={1}>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  style={{
                    fontSize: "12px",
                    marginLeft: "0.5rem",
                  }}
                >
                  Màu sắc:
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  style={{
                    fontSize: "12px",
                    marginLeft: "0.2rem",
                  }}
                >
                  {product?.colorName}
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    display: "inline-block",
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: product?.colorCode || "black",
                    borderRadius: "50%",
                    marginLeft: 1,
                  }}
                />
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  style={{
                    fontSize: "12px",
                    marginLeft: "0.5rem",
                  }}
                >
                  Phân loại:
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
                  {product?.versionName}
                </Typography>
              </Stack>
            </Stack>
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
              {product?.quantity}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"column"}
        spacing={1}
        alignItems={"flex-end"}
        flexBasis={"40%"}
        justifyContent={"center"}
      >
        {product?.promotionPrice > 0 &&
          product?.promotionPrice < product?.price && (
            <Typography
              variant="body1"
              fontWeight={"500"}
              style={{
                fontSize: "12px",
                textDecoration: "line-through",
              }}
            >
              <FormatCurrency amount={product?.price} />
            </Typography>
          )}
        <Typography
          variant="body1"
          fontWeight={"500"}
          color={"color1.main"}
          style={{
            fontSize: "16px",
          }}
        >
          <FormatCurrency
            amount={
              Math.min(product?.price, product?.promotionPrice) *
              product?.quantity
            }
          />
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductInformation;
