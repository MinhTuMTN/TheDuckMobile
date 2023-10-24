import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import StarIcon from '@mui/icons-material/Star';

const CardContainer = styled(Box)(({ theme }) => ({
    width: "20rem",
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    margin: "25px 0 25px 0",
    boxShadow: "2px 2px 5px 0px rgba(0, 64, 128, 0.1)",
}));

const RatingContainer = styled(Box)(({ theme }) => ({
    display: "flex",
}));

const ProductGridItem = ({ productInfo }) => {
    return (
        <CardContainer>
            <img
                style={{
                    maxWidth: "100%",
                    height: "auto",
                }}
                alt="dien-thoai"
                src={productInfo.image} />
            <Typography
                variant="h5"
                align="left"
                style={{ margin: "0 5px 0 5px" }}
            >{productInfo.name}</Typography>
            {/* <Typography
                variant="body2"
                align="left"
                style={{ margin: "0 5px 0 5px" }}
            >{productInfo.description}</Typography> */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: "color1.main"
                }}
                style={{ margin: "5px" }}
            >{productInfo.price}₫
            </Typography>
            <RatingContainer>
                <Typography
                    sx={{
                        fontWeight: "bold",
                        color: "orange"
                    }}
                    style={{ margin: "0 0 5px 5px" }}
                >
                    {productInfo.rate}
                </Typography>
                <StarIcon
                    style={{ color: "orange" }} />
                <Typography
                marginLeft={1}
                sx={{
                        color: "grey"
                    }}>({productInfo.voteList.length})</Typography>
            </RatingContainer>

        </CardContainer>
    )
}


export default ProductGridItem;
