import { get } from "../AxiosInstance";

export const getAllProvinces = () => {
  return get("/addressadmin/province/list");
};