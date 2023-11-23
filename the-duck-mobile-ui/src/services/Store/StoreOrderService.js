import { get } from "../AxiosInstance";

export const getStoreOrder = (params) => {
  return get("/StoreOrder", params);
};

export const getStoreOrderById = (id) => {
  return get(`/StoreOrder/${id}`);
};

export const confirmStoreOrder = (id) => {
  return get(`/StoreOrder/${id}/confirm`);
};

// cancel order
export const cancelStoreOrder = (id) => {
  return get(`/StoreOrder/${id}/cancel`);
};

// confirm delivery
export const confirmDelivery = (id) => {
  return get(`/StoreOrder/${id}/delivery`);
};

// confirm delivered
export const confirmDelivered = (id) => {
  return get(`/StoreOrder/${id}/complete`);
};
