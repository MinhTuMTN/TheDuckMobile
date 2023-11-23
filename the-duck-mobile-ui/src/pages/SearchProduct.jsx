import { Pagination, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import ProductGrid from "../components/ProductGrid";
import ProductSorter from "../components/ProductSorter";
import { searchProducts } from "../services/ProductService";
import usePrevious from "../hooks/usePrevious";
import { Helmet } from "react-helmet-async";

function SearchProduct(props) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const prevQuery = usePrevious(query);
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    totalPages: 1,
    totalProducts: 0,
  });
  const [orderBy, setOrderBy] = React.useState(null);

  const handleOrderBy = (value) => {
    setPagination({ ...pagination, page: 1 });
    if (orderBy === value) {
      setOrderBy(null);
    } else {
      setOrderBy(value);
    }
  };

  useEffect(() => {
    const handleSearchProducts = async () => {
      const response = await searchProducts({
        q: query,
        orderBy: orderBy,
        page: prevQuery === query ? pagination.page - 1 : 0,
      });

      if (response.success) {
        setProducts(response.data.data.objects);
        setPagination({
          page: response.data.data.page + 1,
          totalPages: response.data.data.totalPages,
          totalProducts: response.data.data.totalObjects,
        });
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });

      // Scroll to top
      window.scrollTo(0, 0);
    };

    handleSearchProducts();
  }, [pagination.page, orderBy, enqueueSnackbar, query, prevQuery]);

  return (
    <Stack mt={10} mb={10} width={"100%"} alignItems={"center"}>
      <Helmet>
        <title>Kết quả tìm kiếm cho {query} | The Duck Mobile</title>
      </Helmet>

      <CustomBreadcrumb
        urls={[
          { text: "Trang chủ", url: "/" },
          { text: "Tìm kiếm", url: null },
        ]}
      />
      <Stack sx={{ width: "80%" }} mt={2}>
        <Typography>
          Tìm thấy {pagination.totalProducts} sản phẩm cho từ khóa '
          {searchParams.get("q")}'
        </Typography>

        <ProductSorter value={orderBy} onSort={handleOrderBy} />
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

export default SearchProduct;
