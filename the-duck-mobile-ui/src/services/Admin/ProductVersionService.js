import { get, post } from "../AxiosInstance";

export const getProductVersionAttributes = (productId) => {
  return get(`ProductVersionAdmin/attributes?productId=${productId}`);
};

export const addProductVersion = (data) => {
  return post("ProductVersionAdmin", data, {
    "Content-Type": "multipart/form-data",
  });
};
