import { get, post } from "./AxiosInstance";

export const getAllOrders = () => {
  return get("/orderadmin/list");
};

export const createOrderLoggedIn = (data) => {
  return post("/order/create-order-logged-in", data);
};
