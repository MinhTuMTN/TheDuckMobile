import { get, post } from "../AxiosInstance";

export const getAllStaffs = () => {
  return get("staffadmin");
};

export const resetStaffAccount = (storeId, staffId) => {
  return get(`StoreAdmin/${storeId}/staff/${staffId}/reset`);
};

export const addStaff = (storeId, data) => {
  return post(`storeadmin/${storeId}/staff`, data);
};
