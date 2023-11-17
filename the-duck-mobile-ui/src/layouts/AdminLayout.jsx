import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { Fragment, createContext, useCallback, useEffect, useState } from "react";
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
import { getAllColors } from "../services/Admin/ColorService";
import { getAllSpecialFeatures } from "../services/Admin/SpecialFeatureService";
import { getAllStores } from "../services/Admin/StoreService";
import { getAllOSs } from "../services/Admin/OSService";
import { getAllCoupons } from "../services/Admin/CouponService";
import { getAllFeedbacks } from "../services/Admin/FeedbackService";
import { getAllOrders } from "../services/Admin/OrderService";
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

  // const fetchData = async () => {
  //   var response;
  //   if (pathname === "/admin/product-management/list") {
  //     response = await getAllProducts();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/customer-management/list") {
  //     response = await getAllCustomers();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/staff-management/list") {
  //     response = await getAllStaffs();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/address-management/province/list") {
  //     response = await getAllProvinces();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/catalog-management/list") {
  //     response = await getAllCatalogs();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/brand-management/list") {
  //     response = await getAllBrands();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/color-management/list") {
  //     response = await getAllColors();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/special-feature-management/list") {
  //     response = await getAllSpecialFeatures();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/store-management/list") {
  //     response = await getAllStores();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/os-management/list") {
  //     response = await getAllOSs();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/coupon-management/list") {
  //     response = await getAllCoupons();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   } else if (pathname === "/admin/feedback-management/list") {
  //     response = await getAllFeedbacks();
  //     if (response.success) {
  //       setDataFected(response.data.data);
  //     } else {
  //       enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const fetchData = useCallback(async () => {
    var response;
    if (pathname === "/admin/product-management/list") {
      response = await getAllProducts();
    } else if (pathname === "/admin/customer-management/list") {
      response = await getAllCustomers();
    } else if (pathname === "/admin/staff-management/list") {
      response = await getAllStaffs();
    } else if (pathname === "/admin/address-management/province/list") {
      response = await getAllProvinces();
    } else if (pathname === "/admin/catalog-management/list") {
      response = await getAllCatalogs();
    } else if (pathname === "/admin/brand-management/list") {
      response = await getAllBrands();
    } else if (pathname === "/admin/color-management/list") {
      response = await getAllColors();
    } else if (pathname === "/admin/special-feature-management/list") {
      response = await getAllSpecialFeatures();
    } else if (pathname === "/admin/store-management/list") {
      response = await getAllStores();
    } else if (pathname === "/admin/os-management/list") {
      response = await getAllOSs();
    } else if (pathname === "/admin/coupon-management/list") {
      response = await getAllCoupons();
    } else if (pathname === "/admin/feedback-management/list") {
      response = await getAllFeedbacks();
    } else if (pathname === "/admin/order-management/list") {
      response = await getAllOrders();
    }
  
    if (response.success) {
      setDataFected(response.data.data);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
    }
  }, [pathname]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
