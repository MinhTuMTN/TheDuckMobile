import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button, Divider, Slider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { memo } from "react";
import FilterItem from "./FilterItem";

ProductFilter.propTypes = {
  filter: PropTypes.object,
  maxPrice: PropTypes.number,
  brands: PropTypes.array,
  specialFeatures: PropTypes.array,
  onFilterChange: PropTypes.func,
};

function ProductFilter(props) {
  const { filter, onFilterChange, maxPrice, brands, specialFeatures } = props;

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
              {((filter.price[0] / 100) * maxPrice).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Typography>
              {((filter.price[1] / 100) * maxPrice).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          </Stack>
          <Stack margin={2}>
            <Slider
              sx={{ width: "30rem" }}
              color="color4"
              value={filter.price}
              onChange={(e, value) =>
                onFilterChange((prev) => ({ ...prev, price: value }))
              }
              step={0.1}
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
                    filter.brands.includes(brand.brandId) &&
                    "1px solid #f50057",
                  color: "black",
                }}
                variant="outlined"
                onClick={() => {
                  if (filter.brands.includes(brand.brandId)) {
                    onFilterChange((prev) => ({
                      ...prev,
                      brands: prev.brands.filter(
                        (prevBrand) => prevBrand !== brand.brandId
                      ),
                    }));
                  } else {
                    onFilterChange((prev) => ({
                      ...prev,
                      brands: [...prev.brands, brand.brandId],
                    }));
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
                key={`feature-${feature.specialFeatureId}`}
                variant={
                  filter.specialFeatures.includes(feature.specialFeatureId)
                    ? "contained"
                    : "outlined"
                }
                color={
                  filter.specialFeatures.includes(feature.specialFeatureId)
                    ? "color1"
                    : "color4"
                }
                style={{
                  color: filter.specialFeatures.includes(
                    feature.specialFeatureId
                  )
                    ? "white"
                    : "black",
                }}
                onClick={() => {
                  if (
                    filter.specialFeatures.includes(feature.specialFeatureId)
                  ) {
                    onFilterChange((prev) => ({
                      ...prev,
                      specialFeatures: prev.specialFeatures.filter(
                        (prevFeature) =>
                          prevFeature !== feature.specialFeatureId
                      ),
                    }));
                  } else {
                    onFilterChange((prev) => ({
                      ...prev,
                      specialFeatures: [
                        ...prev.specialFeatures,
                        feature.specialFeatureId,
                      ],
                    }));
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

export default memo(ProductFilter);
