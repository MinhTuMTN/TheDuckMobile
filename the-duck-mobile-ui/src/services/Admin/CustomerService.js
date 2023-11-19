import { get } from "../AxiosInstance";

export const getAllCustomers = () => {
  return get("customeradmin");
};