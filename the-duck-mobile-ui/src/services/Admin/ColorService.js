import { get } from "../AxiosInstance";

export const getAllColors = () => {
  return get("/coloradmin/list");
};