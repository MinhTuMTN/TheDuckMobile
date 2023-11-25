import { get, post, put } from "../AxiosInstance";

export const getAllBrands = (isDeletedFilter = false) => {
  return get(`brandadmin?isDeletedFilter=${isDeletedFilter}`);
};

export const addBrand = (data) => {
  return post(`brandadmin`, data, { "Content-Type": "multipart/form-data" });
};

export const updateBrand = (brandId, data) => {
  return put(`brandadmin/${brandId}`, data, {
    "Content-Type": "multipart/form-data",
  });
};
