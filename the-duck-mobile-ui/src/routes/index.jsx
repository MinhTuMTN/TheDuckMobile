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
import UserListPage from "../pages/Admin/UserManagement/UserListPage";
import BrandListPage from "../pages/Admin/BrandManagement/BrandListPage";
import AddProductPage from "../pages/Admin/ProductManagement/AddProductPage";
import AddBrandPage from "../pages/Admin/BrandManagement/AddBrandPage";
import AddCatalogPage from "../pages/Admin/CatalogManagement/AddCatalogPage";

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
          path: "/admin/catalog-management/list",
          element: <CatalogListPage />,
        },
        {
          path: "/admin/catalog-management/add",
          element: <AddCatalogPage />,
        },
        {
          path: "/admin/product-management/list",
          element: <ProductListPage />,
        },
        {
          path: "/admin/product-management/add",
          element: <AddProductPage />,
        },
        {
          path: "/admin/user-management/list",
          element: <UserListPage />,
        },
        {
          path: "/admin/brand-management/list",
          element: <BrandListPage />,
        },
        {
          path: "/admin/brand-management/add",
          element: <AddBrandPage />,
        }
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/catalog-management/list",
          element: <CatalogListPage />,
        },
        {
          path: "/admin/catalog-management/add",
          element: <AddCatalogPage />,
        },
        {
          path: "/admin/product-management/list",
          element: <ProductListPage />,
        },
        {
          path: "/admin/product-management/add",
          element: <AddProductPage />,
        },
        {
          path: "/admin/user-management/list",
          element: <UserListPage />,
        },
        {
          path: "/admin/brand-management/list",
          element: <BrandListPage />,
        },
        {
          path: "/admin/brand-management/add",
          element: <AddBrandPage />,
        }
      ],
    },
  ]);
}

export default Router;
