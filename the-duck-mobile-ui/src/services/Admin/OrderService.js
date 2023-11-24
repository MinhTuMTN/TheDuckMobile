import { get } from "../AxiosInstance";

export const getAllOrders = () => {
  return get("orderadmin");
};

export const getOrderById = (orderId) => {
  return get(`orderadmin/${orderId}`);
};
