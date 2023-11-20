import { get } from "../AxiosInstance";

export const getAllProvinces = () => {
  return get("/addressadmin/province/");
};

export const getAllDistricts = (provinceId) => {
  return get(`/addressadmin/district?provinceId=${provinceId}`);
};

export const getAllWards = (districtId) => {
  return get(`/addressadmin/ward?districtId=${districtId}`);
};
