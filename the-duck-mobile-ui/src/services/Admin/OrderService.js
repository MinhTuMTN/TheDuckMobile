import { get } from "../AxiosInstance";

export const getAllOrders = () => {
  return get("/orderadmin/list");
};
