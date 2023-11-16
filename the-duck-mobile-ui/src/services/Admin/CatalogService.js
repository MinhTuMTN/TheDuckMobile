import { get } from "../AxiosInstance";

export const getAllCatalogs = () => {
  return get("/catalogadmin/list");
};