import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import ProductSorter from "../components/ProductSorter";
import CustomBreadcrumb from "../components/CustomBreadcrumb";

const CategoryName = styled(Box)(({ theme }) => ({
  background: `url('https://cdn2.slidemodel.com/wp-content/uploads/21511-03-transparent-materials-powerpoint-backgrounds-16x9-1.jpg')`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100%",
  height: "7rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "30px",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "2px",
}));

function Category(props) {
  const [orderBy, setOrderBy] = React.useState(0);

  const handleOrderBy = (value) => {
    if (orderBy === value) {
      setOrderBy(0);
    } else setOrderBy(value);
  };

  return (
    <Stack mt={10} mb={10} width={"100%"} alignItems={"center"}>
      <CustomBreadcrumb
        urls={[
          { text: "Trang chủ", url: "/" },
          { text: "Điện thoại", url: null },
        ]}
      />
      <Stack sx={{ width: "80%" }} mt={2}>
        <CategoryName style={{ marginBottom: "1rem" }}>Điện thoại</CategoryName>
        <ProductFilter />
        <ProductSorter value={orderBy} onSort={handleOrderBy} />
        <ProductGrid margin={"1rem 0rem"} />
      </Stack>
    </Stack>
  );
}

export default Category;
