import { get, post, put } from "../AxiosInstance";

export const getAllCoupons = () => {
  return get("couponadmin");
};

export const addCoupon = (data) => {
  return post("couponadmin", data);
};

export const updateCoupon = (couponId, data) => {
  return put(`couponadmin/${couponId}`, data);
};