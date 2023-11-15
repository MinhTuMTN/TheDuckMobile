import { get } from "../AxiosInstance";

export const getAllOSs = () => {
  return get("/osadmin/list");
};