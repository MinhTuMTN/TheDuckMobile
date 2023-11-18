import { get } from "../AxiosInstance";

export const getAllCoupons = () => {
  return get("/couponadmin/list");
};