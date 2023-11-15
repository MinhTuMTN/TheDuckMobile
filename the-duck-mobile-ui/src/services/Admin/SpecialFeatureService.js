import { get } from "../AxiosInstance";

export const getAllSpecialFeatures = () => {
  return get("/specialfeatureadmin/list");
};