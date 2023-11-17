import { get } from "./AxiosInstance";

export const getBestSellingProducts = () => {
  return get("/product/best-selling");
};

export const getNewestProducts = () => {
  return get("/product/newest");
};

export const getHighlyRatedProducts = () => {
  return get("/product/highly-rated");
};

export const searchProducts = (query) => {
  return get("/product/search", query);
};
