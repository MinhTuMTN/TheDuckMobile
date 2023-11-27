import { get } from "../AxiosInstance";

export const getAllStatistic = (data) => {
  return get("statisticadmin", data);
};