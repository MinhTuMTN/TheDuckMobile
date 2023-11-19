import { get, post } from "./AxiosInstance";

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

export const getProductDetails = (id) => {
  return get(`/product/${id}/versions`);
};

export const getProductsRelatedTo = (id) => {
  return get(`/product/${id}/relative`);
};

export const getProductCartDetails = (data) => {
  return post(`/product/cart-details`, data);
};
