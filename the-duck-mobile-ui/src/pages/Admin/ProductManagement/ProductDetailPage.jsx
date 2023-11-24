import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import BasicProductDetails from "../../../components/Admin/BasicProductDetails";

function ProductDetailPage(props) {
  return (
    <Box component={"main"} sx={{ flexGrow: 1, pt: 0, pb: 4 }}>
      <Container>
        <Stack direction={"column"} spacing={4} width={"100%"}>
          <Stack direction={"column"} width={"100%"}>
            <Stack
              direction={"row"}
              spacing={0}
              alignItems={"center"}
              marginBottom={3}
            >
              <IconButton
                aria-label="back"
                padding="0"
                margin="0"
                color="#111927"
              >
                <ArrowBackIosIcon
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </IconButton>
              <Typography
                variant="body1"
                fontWeight={600}
                style={{
                  fontSize: "14px",
                  color: "#111927",
                }}
              >
                Danh sách sản phẩm
              </Typography>
            </Stack>
            <Typography
              variant="h3"
              fontWeight={600}
              style={{
                textTransform: "uppercase",
                fontSize: "2rem",
              }}
            >
              Sản phẩm
            </Typography>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Typography
                variant="body1"
                fontWeight={400}
                style={{
                  fontSize: "14px",
                }}
              >
                Tạo lúc{" "}
              </Typography>
              <CalendarTodayOutlinedIcon
                sx={{
                  fontSize: "20px",
                }}
              />
              <Typography
                variant="body1"
                fontWeight={450}
                style={{
                  fontSize: "14px",
                }}
              >
                20/10/2021
              </Typography>
            </Stack>
            <BasicProductDetails />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default ProductDetailPage;
