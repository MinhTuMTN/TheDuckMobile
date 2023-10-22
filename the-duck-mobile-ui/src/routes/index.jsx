import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Cart from "../pages/Cart";

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
      ],
    },
  ]);
}

export default Router;
