import { del, get, post, put } from "../AxiosInstance";

export const getAllSpecialFeatures = () => {
  return get("specialfeatureadmin");
};

export const addSpecialFeature = (data) => {
  return post("specialfeatureadmin", data);
};

export const updateSpecialFeature = (specialFeatureId, data) => {
  return put(`specialfeatureadmin/${specialFeatureId}`, data);
};

export const deleteSpecialFeature = (specialFeatureId) => {
  return del(`specialfeatureadmin/${specialFeatureId}`);
};

export const restoreSpecialFeature = (specialFeatureId) => {
  return get(`specialfeatureadmin/restore/${specialFeatureId}`);
};
