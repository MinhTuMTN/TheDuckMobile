import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

const LazyLoad = (Component) => (props) =>
  (
    <React.Suspense fallback={<div>Loading...</div>}>
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
          path: "/category",
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
