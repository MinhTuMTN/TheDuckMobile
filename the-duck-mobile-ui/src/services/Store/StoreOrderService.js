import { get } from "../AxiosInstance";

export const getStoreOrder = (params) => {
  return get("/StoreOrder", params);
};

export const getStoreOrderById = (id) => {
  return get(`/StoreOrder/${id}`);
};
