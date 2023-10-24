import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const IconContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(1.5),
    transform: "scale(1.8)",
    color: "#FFF",
}));

const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "335px",
    height: "85px",
    margin: "0 5px 0 5px",
    // border: "1px solid",
    borderRadius: "20px",
    backgroundColor: "#C70039",
    "&:hover": {
        transform: "scale(1.05)",
        opacity: "0.8",
        cursor: "pointer",
    }
}));
const HomeCatalogItem = ({ data, spaceBottomClass }) => {
    return (
        <Container>
            <IconContainer>{data.icon}</IconContainer>
            <Typography
                variant="h4"
                marginTop={3}
                sx={{
                    textAlign: "center",
                    color: "#FFF",
                }}
            > {data.title}
            </Typography>
        </Container>
    );
};

export default HomeCatalogItem;
