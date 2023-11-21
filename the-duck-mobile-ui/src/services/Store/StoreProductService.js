import { get } from "../AxiosInstance";

export const GetStoreProduct = (params) => {
  return get("/StoreProduct", params);
};
