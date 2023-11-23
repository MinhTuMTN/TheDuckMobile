import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, {
  Fragment,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import TopNavbar from "../components/Store/TopNavbar";
import {
  getAllDistricts,
  getAllProvinces,
} from "../services/Admin/AddressService";
import { getAllBrands } from "../services/Admin/BrandService";
import { getAllCatalogs } from "../services/Admin/CatalogService";
import { getAllColors } from "../services/Admin/ColorService";
import { getAllCoupons } from "../services/Admin/CouponService";
import { getAllCustomers } from "../services/Admin/CustomerService";
import { getAllFeedbacks } from "../services/Admin/FeedbackService";
import { getAllOSs } from "../services/Admin/OSService";
import { getAllOrders } from "../services/Admin/OrderService";
import { getAllProducts } from "../services/Admin/ProductService";
import { getAllSpecialFeatures } from "../services/Admin/SpecialFeatureService";
import { getAllStores } from "../services/Admin/StoreService";

const SIDE_NAV_WIDTH = 280;

const RootPageUser = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const DataContext = createContext();

function AdminLayout(props) {
  const [open, setOpen] = React.useState(false);
  const pathname = useLocation().pathname;
  const editedPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const [dataFetched, setDataFetched] = useState([]);

  const [searchParams] = useSearchParams();

  const fetchData = useCallback(async () => {
    let response;

    switch (editedPath) {
      case "/admin/product-management":
        response = await getAllProducts();
        break;
      case "/admin/customer-management":
      case "/admin":
        response = await getAllCustomers();
        break;
      case "/admin/address-management/province":
        response = await getAllProvinces();
        break;
      case "/admin/address-management/province/detail":
        response = await getAllDistricts(searchParams.get("provinceId"));
        break;
      case "/admin/catalog-management":
        response = await getAllCatalogs();
        break;
      case "/admin/brand-management":
        response = await getAllBrands();
        break;
      case "/admin/color-management":
        response = await getAllColors();
        break;
      case "/admin/special-feature-management":
        response = await getAllSpecialFeatures();
        break;
      case "/admin/store-management":
        response = await getAllStores();
        break;
      case "/admin/os-management":
        response = await getAllOSs();
        break;
      case "/admin/coupon-management":
        response = await getAllCoupons();
        break;
      case "/admin/feedback-management":
        response = await getAllFeedbacks();
        break;
      case "/admin/order-management":
        response = await getAllOrders();
        break;
      default:
        break;
    }

    if (response?.success) {
      setDataFetched(response.data.data);
    } else {
      if (typeof response !== "undefined") {
        enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
      }
    }
  }, [editedPath, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider value={{ dataFetched }}>
      <Fragment>
        <TopNavbar onDrawerClick={setOpen} />
        <AdminSidebar open={open} onOpenClose={setOpen} />
        <RootPageUser>
          <LayoutContainer>
            <Outlet />
          </LayoutContainer>
        </RootPageUser>
      </Fragment>
    </DataContext.Provider>
  );
}

export { DataContext };
export default AdminLayout;
