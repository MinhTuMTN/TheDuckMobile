import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import CartTable from "../components/CartTable";
import CartTotal from "../components/CartTotal";
import { Helmet } from "react-helmet-async";

function Cart(props) {
  return (
    <>
      <Helmet>
        <title>Giỏ hàng | The Duck Mobile</title>
        <meta name="description" content="Giỏ hàng của bạn" />
      </Helmet>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        mt={10}
        mb={10}
      >
        <Stack sx={{ width: "80%" }} mt={10}>
          <Typography variant="h4" component="h1">
            Giỏ hàng của bạn
          </Typography>

          <CartTable />

          <CartTotal />
        </Stack>
      </Box>
    </>
  );
}

export default Cart;
