import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import NotFound from "../pages/NotFound";

import Loading from "../components/Loading";
import AdminLayout from "../layouts/AdminLayout";
import StoreLayout from "../layouts/StoreLayout";
import AddDistrictPage from "../pages/Admin/AddressManagement/DistrictManagement/AddDistrictPage";
import DistrictListPage from "../pages/Admin/AddressManagement/DistrictManagement/DistrictListPage";
import EditDistrictPage from "../pages/Admin/AddressManagement/DistrictManagement/EditDistrictPage";
import AddProvincePage from "../pages/Admin/AddressManagement/ProvinceManagement/AddProvincePage";
import EditProvincePage from "../pages/Admin/AddressManagement/ProvinceManagement/EditProvincePage";
import ProvinceListPage from "../pages/Admin/AddressManagement/ProvinceManagement/ProvinceListPage";
import AddWardPage from "../pages/Admin/AddressManagement/WardManagement/AddWardPage";
import EditWardPage from "../pages/Admin/AddressManagement/WardManagement/EditWardPage";
import WardListPage from "../pages/Admin/AddressManagement/WardManagement/WardListPage";
import AddBrandPage from "../pages/Admin/BrandManagement/AddBrandPage";
import BrandListPage from "../pages/Admin/BrandManagement/BrandListPage";
import EditBrandPage from "../pages/Admin/BrandManagement/EditBrandPage";
import AddCatalogPage from "../pages/Admin/CatalogManagement/AddCatalogPage";
import CatalogListPage from "../pages/Admin/CatalogManagement/CatalogListPage";
import EditCatalogPage from "../pages/Admin/CatalogManagement/EditCatalogPage";
import AddColorPage from "../pages/Admin/ColorManagement/AddColorPage";
import ColorListPage from "../pages/Admin/ColorManagement/ColorListPage";
import EditColorPage from "../pages/Admin/ColorManagement/EditColorPage";
import CustomerDetailPage from "../pages/Admin/CustomerManagement/CustomerDetailPage";
import CustomerListPage from "../pages/Admin/CustomerManagement/CustomerListPage";
import FeedbackListPage from "../pages/Admin/FeedbackManagement/FeedbackListPage";
import AddOSPage from "../pages/Admin/OSManagement/AddOSPage";
import EditOSPage from "../pages/Admin/OSManagement/EditOSPage";
import OSListPage from "../pages/Admin/OSManagement/OSListPage";
import OrderDetailPage from "../pages/Admin/OrderManagement/OrderDetailPage";
import OrderListPage from "../pages/Admin/OrderManagement/OrderListPage";
import AddProductPage from "../pages/Admin/ProductManagement/AddProductPage";
import AddProductVersionPage from "../pages/Admin/ProductManagement/AddProductVersionPage";
import EditProductPage from "../pages/Admin/ProductManagement/EditProductPage";
import EditProductVersionPage from "../pages/Admin/ProductManagement/EditProductVersionPage";
import ProductDetailPage from "../pages/Admin/ProductManagement/ProductDetailPage";
import ProductListPage from "../pages/Admin/ProductManagement/ProductListPage";
import AddPromotionPage from "../pages/Admin/PromotionManagement/AddPromotionPage";
import EditPromotionPage from "../pages/Admin/PromotionManagement/EditPromotionPage";
import PromotionListPage from "../pages/Admin/PromotionManagement/PromotionListPage";
import AddSpecialFeaturePage from "../pages/Admin/SpecialFeatureManagement/AddSpecialFeaturePage";
import EditSpecialFeaturePage from "../pages/Admin/SpecialFeatureManagement/EditSpecialFeaturePage";
import SpecialFeatureListPage from "../pages/Admin/SpecialFeatureManagement/SpecialFeatureListPage";
import AddStaffPage from "../pages/Admin/StaffManagement/AddStaffPage";
import EditStaffPage from "../pages/Admin/StaffManagement/EditStaffPage";
import StaffDetailPage from "../pages/Admin/StaffManagement/StaffDetailPage";
import StaffListPage from "../pages/Admin/StaffManagement/StaffListPage";
import AddStorePage from "../pages/Admin/StoreManagement/AddStorePage";
import EditStorePage from "../pages/Admin/StoreManagement/EditStorePage";
import StoreDetailPage from "../pages/Admin/StoreManagement/StoreDetailPage";
import StoreListPage from "../pages/Admin/StoreManagement/StoreListPage";
import OrderDetails from "../pages/Seller/OrderDetails";
import Orders from "../pages/Seller/Orders";
import Product from "../pages/Seller/Product";

const LazyLoad = (Component) => (props) =>
  (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );

const HomeLazy = LazyLoad(React.lazy(() => import("../pages/Home")));
const SearchProductLazy = LazyLoad(
  React.lazy(() => import("../pages/SearchProduct"))
);
const ProductDetailsLazy = LazyLoad(
  React.lazy(() => import("../pages/ProductDetails"))
);
const CartLazy = LazyLoad(React.lazy(() => import("../pages/Cart")));
const CategoryLazy = LazyLoad(React.lazy(() => import("../pages/Category")));
const ContactUsLazy = LazyLoad(React.lazy(() => import("../pages/ContactUs")));
const ProfileLazy = LazyLoad(React.lazy(() => import("../pages/Profile")));
const LoginLazy = LazyLoad(React.lazy(() => import("../pages/Login")));
const BuyProduct = LazyLoad(React.lazy(() => import("../pages/BuyProduct")));
const OrderHistory = LazyLoad(
  React.lazy(() => import("../pages/OrderHistory"))
);
const OrderHistoryDetails = LazyLoad(
  React.lazy(() => import("../pages/OrderHistoryDetails"))
);

function Router(props) {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomeLazy />,
        },
        {
          path: "/product",
          element: <ProductDetailsLazy />,
        },
        {
          path: "/cart",
          element: <CartLazy />,
        },
        {
          path: "/buy-product",
          element: <BuyProduct />,
        },
        {
          path: "/catalog/:catalogURL",
          element: <CategoryLazy />,
        },
        {
          path: "/search",
          element: <SearchProductLazy />,
        },
        {
          path: "/contact",
          element: <ContactUsLazy />,
        },
        {
          path: "/login",
          element: <LoginLazy />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          path: "profile",
          element: <ProfileLayout />,
          children: [
            {
              element: <ProfileLazy />,
              index: true,
            },
            {
              path: "order-history",
              element: <OrderHistory />,
            },
            {
              path: "order-history-details",
              element: <OrderHistoryDetails />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <MainLayout />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "address-management/province/list",
          element: <ProvinceListPage />,
        },
        {
          path: "address-management/province/add",
          element: <AddProvincePage />,
        },
        {
          path: "address-management/province/edit",
          element: <EditProvincePage />,
        },
        {
          path: "address-management/province/detail",
          element: <DistrictListPage />,
        },
        {
          path: "address-management/province/district/add",
          element: <AddDistrictPage />,
        },
        {
          path: "address-management/province/district/edit",
          element: <EditDistrictPage />,
        },
        {
          path: "address-management/province/district/detail",
          element: <WardListPage />,
        },
        {
          path: "address-management/province/district/ward/add",
          element: <AddWardPage />,
        },
        {
          path: "address-management/province/district/ward/edit",
          element: <EditWardPage />,
        },
        {
          path: "color-management/list",
          element: <ColorListPage />,
        },
        {
          path: "color-management/add",
          element: <AddColorPage />,
        },
        {
          path: "color-management/edit",
          element: <EditColorPage />,
        },
        {
          path: "catalog-management/list",
          element: <CatalogListPage />,
        },
        {
          path: "catalog-management/add",
          element: <AddCatalogPage />,
        },
        {
          path: "catalog-management/edit",
          element: <EditCatalogPage />,
        },
        {
          path: "product-management/list",
          element: <ProductListPage />,
        },
        {
          path: "product-management/add",
          element: <AddProductPage />,
        },
        {
          path: "product-management/add-product-version",
          element: <AddProductVersionPage />,
        },
        {
          path: "product-management/edit",
          element: <EditProductPage />,
        },
        {
          path: "product-management/detail",
          element: <ProductDetailPage />,
        },
        {
          path: "product-management/edit/product-version",
          element: <EditProductVersionPage />,
        },
        {
          path: "customer-management/list",
          element: <CustomerListPage />,
        },

        {
          path: "customer-management/detail",
          element: <CustomerDetailPage />,
        },
        {
          path: "staff-management/list",
          element: <StaffListPage />,
        },
        {
          path: "staff-management/add",
          element: <AddStaffPage />,
        },
        {
          path: "staff-management/edit",
          element: <EditStaffPage />,
        },

        {
          path: "staff-management/detail",
          element: <StaffDetailPage />,
        },
        {
          path: "brand-management/list",
          element: <BrandListPage />,
        },
        {
          path: "brand-management/add",
          element: <AddBrandPage />,
        },
        {
          path: "brand-management/edit",
          element: <EditBrandPage />,
        },
        {
          path: "store-management/list",
          element: <StoreListPage />,
        },
        {
          path: "store-management/add",
          element: <AddStorePage />,
        },
        {
          path: "store-management/edit",
          element: <EditStorePage />,
        },
        {
          path: "store-management/detail",
          element: <StoreDetailPage />,
        },
        {
          path: "os-management/list",
          element: <OSListPage />,
        },
        {
          path: "os-management/add",
          element: <AddOSPage />,
        },
        {
          path: "os-management/edit",
          element: <EditOSPage />,
        },
        {
          path: "order-management/list",
          element: <OrderListPage />,
        },
        {
          path: "order-management/detail",
          element: <OrderDetailPage />,
        },
        {
          path: "promotion-management/list",
          element: <PromotionListPage />,
        },
        {
          path: "promotion-management/add",
          element: <AddPromotionPage />,
        },
        {
          path: "promotion-management/edit",
          element: <EditPromotionPage />,
        },
        {
          path: "feedback-management/list",
          element: <FeedbackListPage />,
        },
        {
          path: "special-feature-management/list",
          element: <SpecialFeatureListPage />,
        },
        {
          path: "special-feature-management/add",
          element: <AddSpecialFeaturePage />,
        },
        {
          path: "special-feature-management/edit",
          element: <EditSpecialFeaturePage />,
        },
      ],
    },
    {
      path: "loading",
      element: <Loading />,
    },
    {
      path: "/store",
      element: <StoreLayout />,
      children: [
        {
          path: "products",
          element: <Product />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "orderdetails",
          element: <OrderDetails />,
        },
      ],
    },
  ]);
}

export default Router;
