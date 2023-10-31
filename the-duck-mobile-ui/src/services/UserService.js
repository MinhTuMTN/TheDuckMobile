import { get } from "./AxiosInstance";

export const getInfo = () => {
  return get("/users");
};
