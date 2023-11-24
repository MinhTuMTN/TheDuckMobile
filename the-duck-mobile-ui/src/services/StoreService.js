import { get } from "./AxiosInstance";

export const getStoreAddresses = () => {
  return get("/store/store-addresses");
};
