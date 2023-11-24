import { get, post } from "./AxiosInstance";

export const createOrderLoggedIn = (data) => {
  return post("/order/create-order-logged-in", data);
};

export const createOrderNonLoggedIn = (data) => {
  return post("/order/create-order-non-logged-in", data);
};

export const getUserOrders = (page, limit) => {
  return get(`/order?page=${page}&limit=${limit}`);
};

export const getOrderById = (id) => {
  return get(`/order/${id}`);
};
