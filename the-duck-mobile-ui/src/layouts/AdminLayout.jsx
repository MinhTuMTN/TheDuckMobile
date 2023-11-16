import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { Fragment, createContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getAllProducts } from "../services/Admin/ProductService";
import { getAllCustomers } from "../services/Admin/CustomerService";
import { getAllStaffs } from "../services/Admin/StaffService";
import { getAllProvinces } from "../services/Admin/AddressService";
import { getAllCatalogs } from "../services/Admin/CatalogService";
import { getAllBrands } from "../services/Admin/BrandService";
import { enqueueSnackbar } from "notistack";

const RootPageUser = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  marginTop: theme.spacing(12),
}));

const Right = styled(Box)(({ theme }) => ({
  flex: 7,
  display: "flex",
}));

const DataContext = createContext();

function AdminLayout(props) {
  const pathname = useLocation().pathname;
  const [dataFetched, setDataFected] = useState([]);

  // const handleGetProducts = async () => {
  //   const productsResponse = await getAllProducts();
  //   if (productsResponse.success) {
  //     setAllProducts(productsResponse.data.data);
  //   }
  // };

  // useEffect(() => {
  //   if (pathname === "/admin/product-management/list") {
  //     handleGetProducts();
  //   }
  // }, [pathname]);

  const fetchData = async () => {
    var response;
    if (pathname === "/admin/product-management/list") {
      response = await getAllProducts();
      if (response.success) {
        setDataFected(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else if (pathname === "/admin/customer-management/list") {
      response = await getAllCustomers();
      if (response.success) {
        setDataFected(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else if (pathname === "/admin/staff-management/list") {
      response = await getAllStaffs();
      if (response.success) {
        setDataFected(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else if (pathname === "/admin/address-management/province/list") {
      response = await getAllProvinces();
      if (response.success) {
        setDataFected(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else if (pathname === "/admin/catalog-management/list") {
      response = await getAllCatalogs();
      console.log(response);
      if (response.success) {
        setDataFected(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    } else if (pathname === "/admin/brand-management/list") {
      response = await getAllBrands();
      console.log(response);
      if (response.success) {
        setDataFected(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathname]);
  return (
    <DataContext.Provider value={{ dataFetched }}>
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
    </DataContext.Provider>
  );
}

export { DataContext };
export default AdminLayout;
