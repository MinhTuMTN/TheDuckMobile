import { get } from "../AxiosInstance";

export const getAllStaffs = () => {
  return get("staffadmin");
};