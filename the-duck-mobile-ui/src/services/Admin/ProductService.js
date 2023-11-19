import { get } from "../AxiosInstance";

export const getAllProducts = () => {
  return get("productadmin");
};

export const getProductById = (productId) => {
  return get(`productadmin/detail?productId=${productId}`);
};

export const deleteProduct = (productId) => {
  return get(`productadmin/delete?productId=${productId}`);
};

export const restoreProduct = (productId) => {
  return get(`productadmin/restore?productId=${productId}`);
};
