import React, { useCallback, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import ProductGrid from "./ProductGrid";
import MuiButton from "./MuiButton";
import { Fragment } from "react";
import FlexContainer from "./FlexContainer";
import {
  getBestSellingProducts,
  getHighlyRatedProducts,
  getNewestProducts,
} from "../services/ProductService";
import { useSnackbar } from "notistack";

const CustomTabList = styled(TabList)(({ theme }) => ({
  margin: "25px 0 0 0",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  width: "100%",
  fontSize: "22px",
}));

const CustomMuiButton = styled(MuiButton)(({ theme }) => ({
  fontSize: "1rem !important",
  backgroundColor: "#C70039",
  color: "#FFF",
  "&:hover": {
    backgroundColor: "#006451",
  },
}));

const TabProducts = () => {
  const [tab, setTab] = useState("1");
  const [newestProducts, setNewestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const handleGetProducts = useCallback(async () => {
    var error = false;
    // get newest products
    const newestProductsResponse = await getNewestProducts();
    if (newestProductsResponse.success)
      setNewestProducts(newestProductsResponse.data.data);
    else
      error = true;

    // get best seller products
    const bestSellerProductsResponse = await getBestSellingProducts();
    if (bestSellerProductsResponse.success)
      setBestSellerProducts(bestSellerProductsResponse.data.data);
    else
      error = true;

    // get top rated products
    const topRatedProductsResponse = await getHighlyRatedProducts();
    if (topRatedProductsResponse.success)
      setTopRatedProducts(topRatedProductsResponse.data.data);
    else
      error = true;

    if (error)
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [enqueueSnackbar]);

  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);

  return (
    <Fragment>
      <TabContext value={tab}>
        <Box>
          <CustomTabList onChange={handleChangeTab} centered>
            <CustomTab label="Mới Nhất" value="1" />
            <CustomTab label="Bán Chạy" value="2" />
            <CustomTab label="Đánh Giá Cao" value="3" />
          </CustomTabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            paddingX: "0px !important",
          }}
        >
          <ProductGrid numberColumn={4} products={newestProducts} />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            paddingX: "0px !important",
          }}
        >
          <ProductGrid numberColumn={4} products={bestSellerProducts} />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            paddingX: "0px !important",
          }}
        >
          <ProductGrid numberColumn={4} products={topRatedProducts} />
        </TabPanel>
      </TabContext>
      <FlexContainer justifyContent="center">
        <CustomMuiButton>Hiển Thị Tất Cả Sản Phẩm</CustomMuiButton>
      </FlexContainer>
    </Fragment>
  );
};

export default TabProducts;
