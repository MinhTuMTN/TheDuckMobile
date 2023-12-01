import { del, get, post, put } from "../AxiosInstance";

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
};

export const GetFilteredProducts = (params) => {
  return get("productadmin/filtered", params);
};

export const updateProductThumbnail = (productId, data) => {
  return put(`productadmin/thumbnail/${productId}`, data, {
    "Content-Type": "multipart/form-data",
  });
};
export const createProduct = (data) => {
  return post("productadmin", data, {
    "Content-Type": "multipart/form-data",
  });
};

export const getProductSpecialFeatures = (productId) => {
  return get(`productadmin/${productId}/special-features`);
};

export const addProductSpecialFeatures = (productId, specialFeatureId) => {
  return post(`productadmin/${productId}/special-features`, {
    specialFeatureId,
  });
};

export const deleteProductSpecialFeatures = (productId, specialFeatureId) => {
  return del(`productadmin/${productId}/special-features/${specialFeatureId}`);
};
