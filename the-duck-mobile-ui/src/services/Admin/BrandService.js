import { get } from "../AxiosInstance";

export const getAllBrands = () => {
  return get("/brandadmin/list");
};