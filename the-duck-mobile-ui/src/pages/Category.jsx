import styled from "@emotion/styled";
import { Pagination, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import ProductFilter from "../components/ProductFilter";
import ProductGrid from "../components/ProductGrid";
import ProductSorter from "../components/ProductSorter";
import {
  getCatalogByCatalogURL,
  getCatalogProductFilter,
} from "../services/CatalogService";

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
  const { catalogURL } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [catalog, setCatalog] = React.useState({
    catalogId: "",
    catalogName: "",
    brands: [],
    specialFeatures: [],
  });
  const [products, setProducts] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    totalPages: 1,
  });
  const [filter, setFilter] = React.useState({
    price: [0, 100],
    brands: [],
    specialFeatures: [],
    orderBy: null,
  });

  const handleFilterChange = (value) => {
    setPagination({ ...pagination, page: 1 });
    setFilter(value);
  };

  const handleOrderBy = (value) => {
    setPagination({ ...pagination, page: 1 });
    if (filter.orderBy === value) {
      setFilter({ ...filter, orderBy: null });
    } else {
      setFilter({ ...filter, orderBy: value });
    }
  };

  useEffect(() => {
    const handleGetCatalogDetail = async () => {
      const response = await getCatalogByCatalogURL(catalogURL);
      if (response.success) {
        setCatalog(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    handleGetCatalogDetail();
  }, [catalogURL, enqueueSnackbar]);

  useEffect(() => {
    const handleGetProductFilter = async () => {
      const response = await getCatalogProductFilter(catalogURL, {
        minPrice: parseInt((filter.price[0] / 100) * 100000000),
        maxPrice: parseInt((filter.price[1] / 100) * 100000000),
        brands: filter.brands,
        specialFeatures: filter.specialFeatures,
        orderBy: filter.orderBy,
        page: pagination.page,
      });

      if (response.success) {
        setProducts(response.data.data.objects);
        setPagination({
          page: response.data.data.page,
          totalPages: response.data.data.totalPages,
        });
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };

    handleGetProductFilter();
  }, [catalogURL, filter, pagination.page, enqueueSnackbar]);

  return (
    <Stack mt={10} mb={10} width={"100%"} alignItems={"center"}>
      <CustomBreadcrumb
        urls={[
          { text: "Trang chủ", url: "/" },
          { text: `${catalog.catalogName}`, url: null },
        ]}
      />
      <Stack sx={{ width: "80%" }} mt={2}>
        <CategoryName style={{ marginBottom: "1rem" }}>
          {catalog.catalogName}
        </CategoryName>
        <ProductFilter
          filter={filter}
          brands={catalog.brands}
          specialFeatures={catalog.specialFeatures}
          onFilterChange={handleFilterChange}
          maxPrice={100000000}
        />
        <ProductSorter value={filter.orderBy} onSort={handleOrderBy} />
        <ProductGrid margin={"1rem 0rem"} products={products} />

        <Pagination
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          count={pagination.totalPages}
          page={pagination.page}
          onChange={(e, page) => setPagination({ ...pagination, page: page })}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Stack>
  );
}

export default Category;
