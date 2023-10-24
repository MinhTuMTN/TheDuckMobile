import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button, Divider, Slider, Stack, Typography } from "@mui/material";
import React from "react";
import FilterItem from "./FilterItem";

ProductFilter.propTypes = {};

function ProductFilter(props) {
  const [price, setPrice] = React.useState([0, 100]);
  const maxPrice = 70000000;

  const brands = ["Apple", "Samsung", "Xiaomi", "Oppo", "Sony", "Vsmart"];
  const [selectedBrands, setSelectedBrands] = React.useState([]);

  const specialFeatures = [
    "Chống nước",
    "Chống bụi",
    "Chống sốc",
    "Chống rung",
    "Có thể gập lại",
  ];
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
                variant={
                  selectedBrands.includes(brand) ? "contained" : "outlined"
                }
                color={selectedBrands.includes(brand) ? "color1" : "color4"}
                style={{
                  color: selectedBrands.includes(brand) ? "white" : "black",
                }}
                onClick={() => {
                  if (selectedBrands.includes(brand)) {
                    setSelectedBrands(
                      selectedBrands.filter(
                        (selectedBrand) => selectedBrand !== brand
                      )
                    );
                  } else {
                    setSelectedBrands([...selectedBrands, brand]);
                  }
                }}
              >
                {brand}
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
                  selectedSpecialFeatures.includes(feature)
                    ? "contained"
                    : "outlined"
                }
                color={
                  selectedSpecialFeatures.includes(feature)
                    ? "color1"
                    : "color4"
                }
                style={{
                  color: selectedSpecialFeatures.includes(feature)
                    ? "white"
                    : "black",
                }}
                onClick={() => {
                  if (selectedSpecialFeatures.includes(feature)) {
                    setSelectedSpecialFeatures(
                      selectedSpecialFeatures.filter(
                        (selectedBrand) => selectedBrand !== feature
                      )
                    );
                  } else {
                    setSelectedSpecialFeatures([
                      ...selectedSpecialFeatures,
                      feature,
                    ]);
                  }
                }}
              >
                {feature}
              </Button>
            ))}
          </Stack>
        </FilterItem>
      </Stack>
    </Box>
  );
}

export default ProductFilter;
