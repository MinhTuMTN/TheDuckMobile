import { get } from "../AxiosInstance";

export const getStoreName = () => {
  return get("/StoreManagement/store-name");
};
