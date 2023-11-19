import { del, get, post, put } from "../AxiosInstance";

export const getAllOSs = () => {
  return get("osadmin");
};

export const addOS = (data) => {
  return post("osadmin", data);
};

export const updateOS = (osId, data) => {
  return put(`osadmin/${osId}`, data);
};

export const deleteOS = (osId) => {
  return del(`osadmin/${osId}`);
};

export const restoreOS = (osId) => {
  return get(`osadmin/restore/${osId}`);
};