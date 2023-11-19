import { get } from "./AxiosInstance";

export const getCoupon = (code) => {
  return get(`/coupon/check?couponCode=${code}`);
};
