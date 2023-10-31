import { post } from "./AxiosInstance";

export const login = (loginData) => {
  return post("/auth/login", loginData);
};
