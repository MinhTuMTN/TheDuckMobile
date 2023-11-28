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
  getAllWards,
} from "../services/Admin/AddressService";
import { getAllBrands } from "../services/Admin/BrandService";
import { getAllCatalogs } from "../services/Admin/CatalogService";
import { getAllColors } from "../services/Admin/ColorService";
import { getAllCoupons } from "../services/Admin/CouponService";
import { getAllCustomers } from "../services/Admin/CustomerService";
import { getAllFeedbacks } from "../services/Admin/FeedbackService";
import { getAllOSs } from "../services/Admin/OSService";
import { getAllOrders } from "../services/Admin/OrderService";
import { getAllSpecialFeatures } from "../services/Admin/SpecialFeatureService";
import { getAllStores } from "../services/Admin/StoreService";
import { getAllStatistic } from "../services/Admin/StatisticService";

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
  const [statistic, setStatistic] = useState({});

  const [searchParams] = useSearchParams();

  const fetchData = useCallback(async () => {
    let response;
    let isStatistic = false;

    switch (editedPath) {
      case "/admin/customer-management":
        response = await getAllCustomers();
        break;
      case "/admin/address-management/province":
        response = await getAllProvinces();
        break;
      case "/admin/address-management/province/detail":
        response = await getAllDistricts(searchParams.get("provinceId"));
        break;
      case "/admin/address-management/province/district/detail":
        response = await getAllWards(searchParams.get("districtId"));
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
      case "/admin":
      case "/admin/analytics":
        isStatistic = true;
        response = await getAllStatistic();
        break;
      default:
        break;
    }

    if (response?.success) {
      if (isStatistic) {
        setStatistic(response.data.data);
      } else {
        setDataFetched(response.data.data);
      }
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
    <DataContext.Provider value={{ dataFetched, statistic }}>
      <Fragment>
        <TopNavbar onDrawerClick={setOpen} isAdmin />
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
