import { get } from "../AxiosInstance";

export const getAllStores = () => {
  return get("/storeadmin/list");
};