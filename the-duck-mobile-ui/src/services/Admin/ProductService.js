import { del, get, put } from "../AxiosInstance";

export const getAllProducts = () => {
  return get("productadmin");
};

export const getProductById = (productId) => {
  return get(`productadmin/${productId}`);
};

export const deleteProduct = (productId) => {
  return del(`productadmin/${productId}`);
};

export const restoreProduct = (productId) => {
  return get(`productadmin/restore/${productId}`);
};

export const updateProduct = (productId, data) => {
  return put(`productadmin/${productId}`, data);
}