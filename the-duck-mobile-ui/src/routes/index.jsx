import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import NotFound from "../pages/NotFound";
import ContactUs from "../pages/ContactUs";
import ProfileLayout from "../layouts/ProfileLayout";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import OrderHistory from "../pages/OrderHistory";
import OrderHistoryDetails from "../pages/OrderHistoryDetails";

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
          path: "/product",
          element: <ProductDetails />,
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
        {
          path: "/login",
          element: <Login />,
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
          element: <OrderHistory />,
        },
        {
          path: "order-history-details",
          element: <OrderHistoryDetails />,
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
  ]);
}

export default Router;
