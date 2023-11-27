import { get, post, put } from "../AxiosInstance";

export const getAllProvinces = () => {
  return get("/addressadmin/province/");
};

export const getAllDistricts = (provinceId) => {
  return get(`/addressadmin/district?provinceId=${provinceId}`);
};

export const getAllWards = (districtId) => {
  return get(`/addressadmin/ward?districtId=${districtId}`);
};

export const getAddresses = () => {
  return get("addressadmin");
};

export const addProvince = (data) => {
  return post("addressadmin/province", data);
};

export const addDistrict = (data) => {
  return post("addressadmin/district", data);
};

export const addWard = (data) => {
  return post("addressadmin/ward", data);
};

export const updateProvince = (provinceId, data) => {
  return put(`addressadmin/province/${provinceId}`, data);
};

export const updateDistrict = (districtId, data) => {
  return put(`addressadmin/district/${districtId}`, data);
};

export const updateWard = (wardId, data) => {
  return put(`addressadmin/ward/${wardId}`, data);
};
