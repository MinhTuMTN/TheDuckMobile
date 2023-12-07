import { Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import CartTable from "../components/CartTable";
import CartTotal from "../components/CartTotal";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import { getProductCartDetails } from "../services/ProductService";
import { useSnackbar } from "notistack";

function Cart(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = React.useState([]); // [{id, name, price, quantity, image}
  const [coupon, setCoupon] = React.useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deleteDiscount, setDeleteDiscount] = useState(false);

  const handleGetProductCartDetails = useCallback(async () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) return;

    const res = await getProductCartDetails(cart);
    if (res.error) {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    } else {
      setProducts(res.data.data);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    handleGetProductCartDetails();
  }, [handleGetProductCartDetails]);

  const handleSelectProduct = (product) => {
    const index = selectedProducts.findIndex(
      (selectedProduct) =>
        selectedProduct.productVersionId === product.productVersionId
    );
    if (index === -1) {
      setSelectedProducts([...selectedProducts, product]);
      setCoupon({});
      setDeleteDiscount(true);
    } else {
      setSelectedProducts([
        ...selectedProducts.slice(0, index),
        ...selectedProducts.slice(index + 1),
      ]);
      setCoupon({});
      setDeleteDiscount(true);
    }
  };

  // Update Selected Products when Products change
  useEffect(() => {
    const newSelectedProducts = selectedProducts.filter((selectedProduct) =>
      products.find(
        (product) =>
          product.productVersionId === selectedProduct.productVersionId
      )
    );
    setSelectedProducts(newSelectedProducts);

  }, [products, selectedProducts]);

  return (
    <Stack mt={10} mb={10} width={"100%"} alignItems={"center"}>
      <Helmet>
        <title>Giỏ hàng | The Duck Mobile</title>
        <meta name="description" content="Giỏ hàng của bạn" />
      </Helmet>

      <CustomBreadcrumb
        urls={[
          { text: "Trang chủ", url: "/" },
          { text: "Giỏ hàng", url: null },
        ]}
      />

      <Stack sx={{ width: "80%" }} mt={7}>
        <Typography variant="h4" component="h1">
          Giỏ hàng của bạn
        </Typography>

        <CartTable
          products={products}
          onProductCartChange={setProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          setCoupon={setCoupon}
          setDeleteDiscount={setDeleteDiscount}
        />

        <CartTotal
          selectedProducts={selectedProducts}
          coupon={coupon}
          onCouponChange={setCoupon}
          deleteDiscount={deleteDiscount}
          setDeleteDiscount={setDeleteDiscount}
        />
      </Stack>
    </Stack>
  );
}

export default Cart;
