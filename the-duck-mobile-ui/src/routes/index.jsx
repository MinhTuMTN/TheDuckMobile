import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import NotFound from "../pages/NotFound";

import AdminLayout from "../layouts/AdminLayout";
import AccountListPage from "../pages/Admin/AccountManagement/AccountListPage";
import AddBrandPage from "../pages/Admin/BrandManagement/AddBrandPage";
import BrandListPage from "../pages/Admin/BrandManagement/BrandListPage";
import EditBrandPage from "../pages/Admin/BrandManagement/EditBrandPage";
import AddCatalogPage from "../pages/Admin/CatalogManagement/AddCatalogPage";
import CatalogListPage from "../pages/Admin/CatalogManagement/CatalogListPage";
import EditCatalogPage from "../pages/Admin/CatalogManagement/EditCatalogPage";
import CustomerListPage from "../pages/Admin/CustomerManagement/CustomerListPage";
import FeedbackListPage from "../pages/Admin/FeedbackManagement/FeedbackListPage";
import AddOSPage from "../pages/Admin/OSManagement/AddOSPage";
import EditOSPage from "../pages/Admin/OSManagement/EditOSPage";
import OSListPage from "../pages/Admin/OSManagement/OSListPage";
import OrderListPage from "../pages/Admin/OrderManagement/OrderListPage";
import AddProductPage from "../pages/Admin/ProductManagement/AddProductPage";
import ProductListPage from "../pages/Admin/ProductManagement/ProductListPage";
import AddPromotionPage from "../pages/Admin/PromotionManagement/AddPromotionPage";
import EditPromotionPage from "../pages/Admin/PromotionManagement/EditPromotionPage";
import PromotionListPage from "../pages/Admin/PromotionManagement/PromotionListPage";
import AddSpecialFeaturePage from "../pages/Admin/SpecialFeatureManagement/AddSpecialFeaturePage";
import EditSpecialFeaturePage from "../pages/Admin/SpecialFeatureManagement/EditSpecialFeaturePage";
import SpecialFeatureListPage from "../pages/Admin/SpecialFeatureManagement/SpecialFeatureListPage";
import StaffListPage from "../pages/Admin/StaffManagement/StaffListPage";
import AddStorePage from "../pages/Admin/StoreManagement/AddStorePage";
import EditStorePage from "../pages/Admin/StoreManagement/EditStorePage";
import StoreListPage from "../pages/Admin/StoreManagement/StoreListPage";
import Loading from "../components/Loading";
import StoreLayout from "../layouts/StoreLayout";
import Product from "../pages/Seller/Product";

const LazyLoad = (Component) => (props) =>
  (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );

const HomeLazy = LazyLoad(React.lazy(() => import("../pages/Home")));
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
          path: "account-management/list",
          element: <AccountListPage />,
        },
        {
          path: "customer-management/list",
          element: <CustomerListPage />,
        },
        {
          path: "staff-management/list",
          element: <StaffListPage />,
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
          path: "products/list",
          element: <Product />,
        },
      ],
    },
  ]);
}

export default Router;
