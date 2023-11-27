import { get, post } from "./AxiosInstance";

export const getCoupon = (code) => {
  return get(`/coupon/check?couponCode=${code}`);
};

export const exchangeCoupon = (point) => {
  return post(`/coupon/points-exchange`, { point });
};

export const getCustomerCoupons = () => {
  return get(`/coupon/points-exchange`);
};
