import { Stack, Typography } from "@mui/material";
import React from "react";

import { Helmet } from "react-helmet-async";
import CartTable from "../components/CartTable";
import CartTotal from "../components/CartTotal";
import CustomBreadcrumb from "../components/CustomBreadcrumb";

function Cart(props) {
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

        <CartTable />

        <CartTotal />
      </Stack>
    </Stack>
  );
}

export default Cart;
