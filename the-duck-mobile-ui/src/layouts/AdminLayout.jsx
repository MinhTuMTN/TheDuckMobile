import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { Fragment, createContext, useEffect, useState } from 'react'
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllProducts } from "../services/Admin/ProductService";

const RootPageUser = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  marginTop: theme.spacing(12),
}));

const Right = styled(Box)(({ theme }) => ({
  flex: 7,
  display: "flex",
}));

const ProductsContext = createContext();

function AdminLayout(props) {
  const pathname = useLocation().pathname;
  const [allProducts, setAllProducts] = useState([]);

  const handleGetProducts = async () => {
    const productsResponse = await getAllProducts();
    if (productsResponse.success){
      setAllProducts(productsResponse.data.data);
    }
  };

  useEffect(() => {
    if (pathname === "/admin/product-management/list") {
      handleGetProducts();
    }
  }, [pathname]);
  return (
    <ProductsContext.Provider value={{ allProducts }}>
      <Fragment>
        <Navbar />
        <RootPageUser>
          <AdminSidebar />
          <Right>
            <Outlet />
          </Right>
        </RootPageUser>
        <Footer />
      </Fragment>
    </ProductsContext.Provider>
  );
}

export { ProductsContext };
export default AdminLayout;