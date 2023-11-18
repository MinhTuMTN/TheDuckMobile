import styled from "@emotion/styled";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import FormatCurrency from "../components/FormatCurrency";
import ProductDetailsRating from "../components/ProductDetailsRating";
import ProductDetailsShortDesc from "../components/ProductDetailsShortDesc";
import ProductGrid from "../components/ProductGrid";
import QuantityCounter from "../components/QuantityCounter";
import Sliders from "../components/Sliders";
import TabRelative from "../components/TabRelative";
import { getProductDetails } from "../services/ProductService";
import FadeSlider from "../components/FadeSlider";

const Wrapper = styled.div``;
const ShopArea = styled.div`
  padding-top: 30px;
  color: rgba(0, 0, 0, 0.65);
  padding-bottom: 100px;
`;

const Container = styled.div`
  display: block;
  width: 80%;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
  overflow: hidden;

  /* @media (min-width: 960px) {
    max-width: 1100px;
  }

  @media (max-width: 959px) and (min-width: 720px) {
    max-width: 720px;
  }

  @media (max-width: 719px) and (min-width: 540px) {
    max-width: 540px;
  } */
`;
const PageContainer = styled.div`
  width: 100%;
  padding-right: 0;
`;

const StyledButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.color1.main,
    color: theme.palette.color4.main4,
  },
}));

// Styled Button show color with shape circle and background color
const StyledButtonColor = styled(Button)(({ theme }) => ({
  borderRadius: "50%",
  width: "2rem",
  height: "2rem",
  minWidth: "2rem",
  border: "1px solid #000",
}));

// Outer of button
const StyledButtonColorOuter = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  width: "2.5rem",
  height: "2.5rem",
  minWidth: "2.5rem",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  // Shadow when hover
  "&:hover": {
    scale: "1.1",
  },
}));
function ProductDetails(props) {
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedImage, setSelectedImage] = React.useState("");
  const [urlsImage, setUrlsImage] = React.useState([]);

  const [info, setInfo] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState({});

  const handleGetProductDetails = useCallback(async () => {
    const response = await getProductDetails(searchParams.get("id"));
    if (response.success) {
      setInfo(response.data.data);

      const colors = response.data.data.productColorVersions;
      setColors(colors);

      const selectedVersion = colors[0]?.productVersions[0];
      setSelectedVersion(selectedVersion);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [searchParams, enqueueSnackbar]);

  useEffect(() => {
    handleGetProductDetails();
  }, [handleGetProductDetails]);

  useEffect(() => {
    if (selectedVersion?.images) {
      setSelectedImage(selectedVersion.images[0]);
      setUrlsImage(selectedVersion.images);
    }
  }, [selectedVersion]);

  useEffect(() => {
    setSelectedVersion(colors[selectedColorIndex]?.productVersions[0]);
  }, [colors, selectedColorIndex]);

  return (
    <Wrapper>
      <CustomBreadcrumb
        urls={[
          {
            url: "/",
            text: "Trang chủ",
          },
          {
            url: "/category",
            text: "Điện thoại",
          },
          {
            url: null,
            text: `${info && info.productName}`,
          },
        ]}
      />
      <ShopArea>
        <Container>
          <PageContainer>
            <Grid direction={"row"} container width={"100%"}>
              <Grid
                container
                item
                md={6}
                xs={12}
                direction={"column"}
                height={"700px"}
                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <Grid item xs={8} width={"100%"} overflow={"hidden"}>
                  <Card sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        backgroundImage: `url(${
                          typeof selectedImage === "string"
                            ? selectedImage
                            : selectedImage?.images[selectedImage]
                        })`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></Box>
                  </Card>
                </Grid>
                <Grid item xs={4} width={"100%"} overflow={"hidden"}>
                  {selectedVersion?.images &&
                    selectedVersion?.images.length > 0 && (
                      <Sliders
                        urls={selectedVersion?.images}
                        arrows
                        slidesToScroll={3}
                        slidesToShow={4}
                        onClick={(e) => {
                          setSelectedImage(e.target.src);
                        }}
                      />
                    )}
                </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <Stack
                  direction={"column"}
                  width={"100%"}
                  sx={{
                    marginLeft: {
                      xs: "0",
                      md: "10%",
                    },
                  }}
                >
                  <Typography variant={"h4"} color={"#0c0b0bc9"}>
                    {info && info.productName}
                  </Typography>
                  <Box margin={"0.5% 0 3%"}>
                    <span
                      style={{
                        fontSize: "24px",
                        color: "#fe5252",
                        marginRight: "20px",
                      }}
                    >
                      <FormatCurrency
                        amount={Math.min(
                          selectedVersion?.price,
                          selectedVersion?.promotionPrice
                        )}
                      />
                    </span>
                    {selectedVersion?.promotionPrice &&
                      selectedVersion?.promotionPrice <
                        selectedVersion?.price && (
                        <span
                          style={{
                            fontSize: "18px",
                            color: "#333333",
                            textDecoration: "line-through",
                          }}
                        >
                          <FormatCurrency amount={selectedVersion?.price} />
                        </span>
                      )}
                  </Box>

                  <ProductDetailsRating
                    rating={info.rate}
                    numReviews={info.votes?.length}
                  />

                  <ProductDetailsShortDesc />

                  <Stack
                    direction={"column"}
                    spacing={2}
                    sx={{
                      borderBottom: "1px solid #cbcaca",
                      paddingBottom: "2rem",
                    }}
                  >
                    <Box style={{ marginRight: "20px" }}>
                      <Typography variant={"h6"}>Màu sắc</Typography>
                      <Stack direction={"row"} spacing={2} marginTop={1}>
                        {colors.map((color, index) => (
                          <StyledButtonColorOuter
                            key={`color-${index}`}
                            style={{
                              border:
                                selectedColorIndex === index
                                  ? "2px solid #C70039"
                                  : "none",
                            }}
                            onClick={() => setSelectedColorIndex(index)}
                          >
                            <StyledButtonColor
                              style={{ backgroundColor: color?.colorCode }}
                            />
                          </StyledButtonColorOuter>
                        ))}
                      </Stack>
                    </Box>
                    <Box style={{ marginRight: "20px" }}>
                      <Typography variant={"h6"}>Phân loại</Typography>
                      <Stack direction={"row"} spacing={2} marginTop={1}>
                        {colors[selectedColorIndex]?.productVersions?.map(
                          (version) => (
                            <Button
                              key={`version-${version.productVersionId}`}
                              variant="outlined"
                              color="inherit"
                              style={{
                                border:
                                  selectedVersion.productVersionId ===
                                  version.productVersionId
                                    ? "2px solid #064374"
                                    : "none",
                              }}
                              onClick={() => setSelectedVersion(version)}
                            >
                              {version?.versionName}
                            </Button>
                          )
                        )}
                      </Stack>
                    </Box>
                    <Stack direction={"column"} spacing={1}>
                      <Stack direction={"row"} spacing={2} alignItems={"end"}>
                        <Typography variant={"h6"}>Số lượng</Typography>
                        <QuantityCounter />
                      </Stack>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        <StyledButton
                          variant="contained"
                          color="color4"
                          size="large"
                          endIcon={<AddShoppingCartIcon />}
                          style={{
                            height: "100%",
                            flexBasis: "75%",
                            marginTop: "10px",
                            color: "#fff",
                          }}
                        >
                          Thêm vào giỏ hàng
                        </StyledButton>
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          color="color1"
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <TabRelative
                  description={info?.productDescription}
                  specification={selectedVersion?.specification}
                  attributes={info?.catalogAttributes}
                  review={info?.votes}
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                paddingLeft={"15px"}
                paddingRight={"15px"}
                marginTop={"4rem"}
              >
                <Typography
                  variant={"h4"}
                  textAlign={"left"}
                  sx={{
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #cbcaca",
                    marginBottom: "1.5rem",
                  }}
                >
                  Sản phẩm liên quan
                </Typography>
                <ProductGrid numberColumn={5} />
              </Grid>
            </Grid>
          </PageContainer>
        </Container>
      </ShopArea>
    </Wrapper>
  );
}

export default ProductDetails;
