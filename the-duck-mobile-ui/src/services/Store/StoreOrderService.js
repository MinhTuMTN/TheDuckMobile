import { get } from "../AxiosInstance";

export const getStoreOrder = (params) => {
  return get("/StoreOrder", params);
};
