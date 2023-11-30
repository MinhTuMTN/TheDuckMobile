import { del, get, post, put } from "../AxiosInstance";

export const getProductVersionAttributes = (productId) => {
  return get(`ProductVersionAdmin/attributes?productId=${productId}`);
};

export const addProductVersion = (data) => {
  return post(
    "ProductVersionAdmin",
    data,
    {
      "Content-Type": "multipart/form-data",
    },
    10000
  );
};

export const deleteProductVersion = (productVersionId) => {
  return del(`ProductVersionAdmin/${productVersionId}`);
};

export const restoreProductVersion = (productVersionId) => {
  return get(`ProductVersionAdmin/${productVersionId}/restore`);
};

export const getProductVersion = (productVersionId) => {
  return get(`ProductVersionAdmin/${productVersionId}`);
};

export const updateProductVersion = (productVersionId, data) => {
  return put(
    `ProductVersionAdmin/${productVersionId}`,
    data,
    {
      "Content-Type": "multipart/form-data",
    },
    10000
  );
};
