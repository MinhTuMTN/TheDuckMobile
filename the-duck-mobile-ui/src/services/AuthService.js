import { get, post } from "./AxiosInstance";

export const login = (phone, otp) => {
  return post("/auth/login", { phone, otp });
};

export const register = (phone, fullName, dateOfBirth, gender, otp) => {
  return post("/auth/register", { phone, fullName, dateOfBirth, gender, otp });
};

export const checkPhoneExists = (phone) => {
  return post("/auth/check-phone-number", { phone });
};

export const checkToken = () => {
  return get("/auth/check-token");
};
