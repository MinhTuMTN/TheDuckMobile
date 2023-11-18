import {
  Box,
  CardMedia,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import FormatCurrency from "./FormatCurrency";
import PercentIcon from "@mui/icons-material/Percent";

const CardContainer = styled(Paper)(({ theme }) => ({
  borderRadius: "15px",
  height: "100%",
  overflow: "hidden",
  margin: "25px 0 25px 0",
  boxShadow: "2px 2px 5px 2px rgba(0, 64, 128, 0.1)",
  ":hover": {
    border: "1px solid #07407C",
    boxShadow: "2px 2px 5px 3px rgba(7, 62, 116, 0.3)",
    "& .product-name": {
      color: "#288ad6", // Điều chỉnh màu chữ khi hover
    },
  },
}));

const calculateDiscountPercentage = (promotionPrice, productPrice) => {
  const discountPercentage =
    ((productPrice - promotionPrice) / productPrice) * 100;
  return discountPercentage.toFixed(0);
};

const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingX: "0",
}));

const ProductGridItem = ({ productInfo, styled }) => {
  return (
    <CardContainer style={styled} component={Stack} direction={"column"}>
      <Box
        sx={{
          paddingTop: "1.25rem",
          paddingX: "1.5rem",
          flex: 2,
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          width={"100%"}
          height={"100%"}
          image={productInfo.thumbnail}
          alt="Hinh anh san pham"
          sx={{
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-8px)", // Điều chỉnh giá trị theo mong muốn của bạn
            },
          }}
        />
      </Box>
      <Box
        sx={{
          paddingTop: "1rem",
          paddingBottom: "1.25rem",
          paddingX: "1.5rem",
          flex: 1,
        }}
      >
        {" "}
        {productInfo.promotionPrice &&
          productInfo.promotionPrice < productInfo.productPrice && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{
                width: "45%",
                height: "20%",
                backgroundColor: "#e83a45",
                borderRadius: "20px",
                paddingX: "0.22rem",
                paddingY: "0.1rem",
              }}
            >
              <PercentIcon
                sx={{
                  fontSize: "1rem",
                  color: "#FFF",
                }}
              />
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#FFF",
                  fontWeight: "600",
                  marginLeft: "0.2rem",
                }}
              >
                GIÁ RẺ QUÁ
              </Typography>
            </Stack>
          )}
        <Typography
          variant="h6"
          align="left"
          fontWeight={"580"}
          style={{
            fontSize: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            transition: "color 0.3s ease-in-out", // Thêm hiệu ứng chuyển động màu chữ
          }}
          className="product-name"
        >
          {productInfo.productName}
        </Typography>
        {productInfo.promotionPrice &&
          productInfo.promotionPrice < productInfo.productPrice && (
            <Stack direction={"row"} spacing={1}>
              <Typography
                variant="body1"
                style={{
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#333333",
                  textDecoration: "line-through",
                }}
              >
                <FormatCurrency amount={productInfo.productPrice} />
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#333333",
                }}
              >
                -
                {calculateDiscountPercentage(
                  productInfo.promotionPrice,
                  productInfo.productPrice
                )}
                %
              </Typography>
            </Stack>
          )}
        <Typography
          variant="body1"
          style={{
            fontWeight: "600",
            fontSize: "18px",
            color: "#e83a45",
          }}
        >
          <FormatCurrency amount={productInfo.promotionPrice} />
        </Typography>
        <RatingContainer alignItems={"center"}>
          <Rating
            name="half-rating-read"
            defaultValue={productInfo.rate}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography
            variant="body1"
            fontWeight={"500"}
            style={{ fontSize: "14px", marginLeft: "0.75rem" }}
          >
            ({productInfo.numberOfVotes})
          </Typography>
        </RatingContainer>
      </Box>
    </CardContainer>
  );
};

export default ProductGridItem;
