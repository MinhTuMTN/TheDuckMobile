import { get } from "../AxiosInstance";

export const getAllStatistic = (data) => {
  return get(`storestatistic`, data);
};