import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import NotFound from "../pages/NotFound";

import Loading from "../components/Loading";
import AdminLayout from "../layouts/AdminLayout";
import StoreLayout from "../layouts/StoreLayout";
import DistrictListPage from "../pages/Admin/AddressManagement/DistrictManagement/DistrictListPage";
import ProvinceListPage from "../pages/Admin/AddressManagement/ProvinceManagement/ProvinceListPage";
import WardListPage from "../pages/Admin/AddressManagement/WardManagement/WardListPage";
import BrandListPage from "../pages/Admin/BrandManagement/BrandListPage";
import AddCatalogPage from "../pages/Admin/CatalogManagement/AddCatalogPage";
import CatalogListPage from "../pages/Admin/CatalogManagement/CatalogListPage";
import EditCatalogPage from "../pages/Admin/CatalogManagement/EditCatalogPage";
import AddColorPage from "../pages/Admin/ColorManagement/AddColorPage";
import ColorListPage from "../pages/Admin/ColorManagement/ColorListPage";
import EditColorPage from "../pages/Admin/ColorManagement/EditColorPage";
import AddCouponPage from "../pages/Admin/CouponManagement/AddCouponPage";
import CouponListPage from "../pages/Admin/CouponManagement/CouponListPage";
import EditCouponPage from "../pages/Admin/CouponManagement/EditCouponPage";
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
import AddSpecialFeaturePage from "../pages/Admin/SpecialFeatureManagement/AddSpecialFeaturePage";
import EditSpecialFeaturePage from "../pages/Admin/SpecialFeatureManagement/EditSpecialFeaturePage";
import SpecialFeatureListPage from "../pages/Admin/SpecialFeatureManagement/SpecialFeatureListPage";
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
          path: "/payment",
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
          path: "address-management/province",
          element: <ProvinceListPage />,
        },

        {
          path: "address-management/province/detail",
          element: <DistrictListPage />,
        },

        {
          path: "address-management/province/district/detail",
          element: <WardListPage />,
        },

        {
          path: "color-management",
          element: <ColorListPage />,
        },
        {
          path: "color-management",
          element: <AddColorPage />,
        },
        {
          path: "color-management/:colorId",
          element: <EditColorPage />,
        },
        {
          path: "catalog-management",
          element: <CatalogListPage />,
        },
        {
          path: "catalog-management/add",
          element: <AddCatalogPage />,
        },
        {
          path: "catalog-management/:catalogId",
          element: <EditCatalogPage />,
        },
        {
          path: "product-management",
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
          path: "customer-management",
          element: <CustomerListPage />,
        },

        {
          path: "customer-management/:customerId",
          element: <CustomerDetailPage />,
        },

        {
          path: "brand-management",
          element: <BrandListPage />,
        },

        {
          path: "store-management",
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
          path: "os-management",
          element: <OSListPage />,
        },
        {
          path: "os-management/add",
          element: <AddOSPage />,
        },
        {
          path: "os-management/:osId",
          element: <EditOSPage />,
        },
        {
          path: "order-management",
          element: <OrderListPage />,
        },
        {
          path: "order-management/:orderId",
          element: <OrderDetailPage />,
        },
        {
          path: "coupon-management",
          element: <CouponListPage />,
        },
        {
          path: "coupon-management/add",
          element: <AddCouponPage />,
        },
        {
          path: "coupon-management/edit",
          element: <EditCouponPage />,
        },
        {
          path: "feedback-management",
          element: <FeedbackListPage />,
        },
        {
          path: "special-feature-management",
          element: <SpecialFeatureListPage />,
        },
        {
          path: "special-feature-management/add",
          element: <AddSpecialFeaturePage />,
        },
        {
          path: "special-feature-management/:specialFeature",
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
          path: "order-details",
          element: <OrderDetails />,
        },
      ],
    },
  ]);
}

export default Router;
