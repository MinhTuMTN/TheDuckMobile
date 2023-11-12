import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import StoreIcon from "@mui/icons-material/Store";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FilterItem from "./FilterItem";
import PropTypes from "prop-types";

ProductFilter.propTypes = {
  brands: PropTypes.array,
  specialFeatures: PropTypes.array,
};

function ProductFilter(props) {
  const [price, setPrice] = React.useState([0, 100]);
  const maxPrice = 70000000;

  const { brands, specialFeatures } = props;
  const [selectedBrands, setSelectedBrands] = React.useState([]);

  const [selectedSpecialFeatures, setSelectedSpecialFeatures] = React.useState(
    []
  );
  return (
    <Box>
      <Typography variant="h5" component="h2" mb={1}>
        Chọn sản phẩm theo tiêu chí
      </Typography>
      <Divider />

      <Stack direction={"row"} spacing={1} mt={1}>
        <FilterItem name="Giá" startIcon={<AttachMoneyIcon />}>
          <Stack margin={2} justifyContent={"space-between"} direction={"row"}>
            <Typography>
              {((price[0] / 100) * maxPrice).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Typography>
              {((price[1] / 100) * maxPrice).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          </Stack>
          <Stack margin={2}>
            <Slider
              sx={{ width: "15rem" }}
              color="color4"
              value={price}
              onChange={(e, value) => setPrice(value)}
              step={0.00001}
            />
          </Stack>
        </FilterItem>

        <FilterItem name="Hãng" startIcon={<StoreIcon />}>
          <Stack
            margin={2}
            direction={"row"}
            spacing={1}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            {brands.map((brand) => (
              <Button
                key={brand}
                startIcon={
                  <Typography
                    component={"img"}
                    src={brand.brandLogo}
                    height={"100%"}
                    width={"4rem"}
                  />
                }
                style={{
                  border:
                    selectedBrands.includes(brand.brandId) &&
                    "1px solid #f50057",
                  color: "black",
                }}
                variant="outlined"
                onClick={() => {
                  if (selectedBrands.includes(brand.brandId)) {
                    setSelectedBrands(
                      selectedBrands.filter(
                        (selectedBrand) => selectedBrand !== brand.brandId
                      )
                    );
                  } else {
                    setSelectedBrands([...selectedBrands, brand.brandId]);
                  }
                }}
              >
                {brand.brandName}
              </Button>
            ))}
          </Stack>
        </FilterItem>

        <FilterItem name="Tính năng đặc biệt" startIcon={<SmartButtonIcon />}>
          <Stack
            margin={2}
            direction={"row"}
            spacing={1}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            {specialFeatures.map((feature) => (
              <Button
                key={feature}
                variant={
                  selectedSpecialFeatures.includes(feature.specialFeatureId)
                    ? "contained"
                    : "outlined"
                }
                color={
                  selectedSpecialFeatures.includes(feature.specialFeatureId)
                    ? "color1"
                    : "color4"
                }
                style={{
                  color: selectedSpecialFeatures.includes(
                    feature.specialFeatureId
                  )
                    ? "white"
                    : "black",
                }}
                onClick={() => {
                  if (
                    selectedSpecialFeatures.includes(feature.specialFeatureId)
                  ) {
                    setSelectedSpecialFeatures(
                      selectedSpecialFeatures.filter(
                        (selectedBrand) =>
                          selectedBrand !== feature.specialFeatureId
                      )
                    );
                  } else {
                    setSelectedSpecialFeatures([
                      ...selectedSpecialFeatures,
                      feature.specialFeatureId,
                    ]);
                  }
                }}
              >
                {feature.specialFeatureName}
              </Button>
            ))}
          </Stack>
        </FilterItem>
      </Stack>
    </Box>
  );
}

export default ProductFilter;
