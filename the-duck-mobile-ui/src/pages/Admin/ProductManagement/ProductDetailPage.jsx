import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import BasicProductDetails from "../../../components/Admin/BasicProductDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductById } from "../../../services/Admin/ProductService";
import FormatDateTime from "../../../components/FormatDateTime";

function ProductDetailPage(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  const handleGetProduct = useCallback(async () => {
    const response = await getProductById(state.id);
    if (response.success) {
      setProduct(response.data.data);
    }
  }, [state.id]);

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

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
                onClick={() => {
                  navigate("/admin/product-management");
                }}
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
                Tạo lúc {" "}
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
                <FormatDateTime dateTime={product.createdAt} />
              </Typography>
            </Stack>
            <BasicProductDetails product={product} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default ProductDetailPage;
