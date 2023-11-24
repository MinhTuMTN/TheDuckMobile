import { del, get, post, put } from "./AxiosInstance";

export const getProvines = () => {
  return get("address/provinces");
};

export const getDistricts = (provinceId) => {
  return get(`address/districts?provineId=${provinceId}`);
};

export const getWards = (districtId) => {
  return get(`address/wards?districtId=${districtId}`);
};

export const getAddresses = () => {
  return get("address");
};

export const addAddress = (data) => {
  return post("address", data);
};

export const addAddressAnonymous = (data) => {
  return post("address/anonymous", data);
};

export const deleteAddress = (addressId) => {
  return del(`address?addressId=${addressId}`);
};

export const updateAddress = (addressId, data) => {
  return put(`address?addressId=${addressId}`, data);
};
