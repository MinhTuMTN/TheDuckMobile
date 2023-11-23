import { get, post } from "../AxiosInstance";

export const GetStoreProduct = (params) => {
  return get("/StoreProduct", params);
};

export const UpdateStoreProductQuantity = (storeProductId, data) => {
  return post(`/StoreProduct/${storeProductId}/update-quantity`, data);
};
