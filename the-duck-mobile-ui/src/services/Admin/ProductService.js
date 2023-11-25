import { get, post } from "../AxiosInstance";

export const getAllProducts = () => {
  return get("productadmin");
};

export const getProductById = (productId) => {
  return get(`productadmin/${productId}`);
};

export const deleteProduct = (productId) => {
  return get(`productadmin/delete?productId=${productId}`);
};

export const restoreProduct = (productId) => {
  return get(`productadmin/restore?productId=${productId}`);
};

export const createProduct = (data) => {
  return post("productadmin", data, {
    "Content-Type": "multipart/form-data",
  });
};
