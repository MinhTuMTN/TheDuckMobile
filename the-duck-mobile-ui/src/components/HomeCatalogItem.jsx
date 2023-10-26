import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

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
  },
}));
const HomeCatalogItem = ({ data, spaceBottomClass }) => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        style={{
          color: "#FFF",
          transform: "scale(1.5)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {data.icon}
      </Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#FFF",
        }}
        style={{
          fontSize: "1.3rem",
        }}
      >
        {" "}
        {data.title}
      </Typography>
    </Container>
  );
};

export default HomeCatalogItem;
