import { del, get, post, put } from "../AxiosInstance";

export const getAllCoupons = () => {
  return get("couponadmin");
};

export const addCoupon = (data) => {
  return post("couponadmin", data);
};

export const updateCoupon = (couponId, data) => {
  return put(`couponadmin/${couponId}`, data);
};

export const getCouponById = (couponId) => {
  return get(`couponadmin/${couponId}`);
};


export const deleteCoupon = (couponId) => {
  return del(`couponadmin/${couponId}`);
};

export const restoreCoupon = (couponId) => {
  return get(`couponadmin/restore/${couponId}`);
};
