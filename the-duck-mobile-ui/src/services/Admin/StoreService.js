import { del, get, post, put } from "../AxiosInstance";

export const getAllStores = () => {
  return get("storeadmin");
};

export const addStore = (data) => {
  return post("storeadmin", data);
};

export const updateStore = (storeId, data) => {
  return put(`storeadmin/${storeId}`, data);
};

export const deleteStore = (storeId) => {
  return del(`storeadmin/${storeId}`);
};

export const restoreStore = (storeId) => {
  return get(`storeadmin/restore/${storeId}`);
};

export const getStoreById = (storeId) => {
  return get(`storeadmin/${storeId}`);
};

export const addStoreProvince = (storeId, provinceId) => {
  return post(`storeadmin/${storeId}/province`, { provinceId });
};
