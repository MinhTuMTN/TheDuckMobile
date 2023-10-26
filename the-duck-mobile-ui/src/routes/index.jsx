import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
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
