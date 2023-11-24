import { del, get, post, put } from "../AxiosInstance";

export const getAllCatalogs = () => {
  return get("catalogadmin");
};

export const addCatalog = (data) => {
  return post("catalogadmin", data);
};

export const updateCatalog = (catalogId, data) => {
  return put(`catalogadmin/${catalogId}`, data);
};

export const deleteCatalog = (catalogId) => {
  return del(`catalogadmin/${catalogId}`);
};

export const restoreCatalog = (catalogId) => {
  return get(`catalogadmin/restore/${catalogId}`);
};