import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import NotFound from "../pages/NotFound";
import ContactUs from "../pages/ContactUs";
import ProfileLayout from "../layouts/ProfileLayout";
import Profile from "../pages/Profile";
import AdminLayout from "../layouts/AdminLayout";
import CatalogListPage from "../pages/Admin/CatalogManagement/CatalogListPage";
import ProductListPage from "../pages/Admin/ProductManagement/ProductListPage";
import BrandListPage from "../pages/Admin/BrandManagement/BrandListPage";
import AddProductPage from "../pages/Admin/ProductManagement/AddProductPage";
import AddBrandPage from "../pages/Admin/BrandManagement/AddBrandPage";
import AddCatalogPage from "../pages/Admin/CatalogManagement/AddCatalogPage";
import AddOSPage from "../pages/Admin/OSManagement/AddOSPage";
import OSListPage from "../pages/Admin/OSManagement/OSListPage";
import CustomerListPage from "../pages/Admin/CustomerManagement/CustomerListPage";
import StaffListPage from "../pages/Admin/StaffManagement/StaffListPage";
import AccountListPage from "../pages/Admin/AccountManagement/AccountListPage";
import OrderListPage from "../pages/Admin/OrderManagement/OrderListPage";
import StoreListPage from "../pages/Admin/StoreManagement/StoreListPage";
import AddStorePage from "../pages/Admin/StoreManagement/AddStorePage";
import PromotionListPage from "../pages/Admin/PromotionManagement/PromotionListPage";
import AddPromotionPage from "../pages/Admin/PromotionManagement/AddPromotionPage";
import FeedbackListPage from "../pages/Admin/FeedbackManagement/FeedbackListPage";
import EditPromotionPage from "../pages/Admin/PromotionManagement/EditPromotionPage";
import EditOSPage from "../pages/Admin/OSManagement/EditOSPage";
import EditStorePage from "../pages/Admin/StoreManagement/EditStorePage";
import EditBrandPage from "../pages/Admin/BrandManagement/EditBrandPage";
import EditCatalogPage from "../pages/Admin/CatalogManagement/EditCatalogPage";

function Router(props) {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
      ],
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
      children: [
        {
          element: <Profile />,
          index: true,
        },
        {
          path: "order-history",
          element: <div>Order History</div>,
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
      ],
    },
  ]);
}

export default Router;
