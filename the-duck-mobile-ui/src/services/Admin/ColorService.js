import { del, get, post, put } from "../AxiosInstance";

export const getAllColors = () => {
  return get("coloradmin");
};

export const addColor = (data) => {
  return post("coloradmin", data);
};

export const updateColor = (colorId, data) => {
  return put(`coloradmin/${colorId}`, data);
};

export const deleteColor = (colorId) => {
  return del(`coloradmin/${colorId}`);
};

export const restoreColor = (colorId) => {
  return get(`coloradmin/restore/${colorId}`);
};