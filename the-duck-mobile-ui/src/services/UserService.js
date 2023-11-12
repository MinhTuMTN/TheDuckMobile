import { get, post } from "./AxiosInstance";

export const getInfo = () => {
  return get("/users");
};

export const editInfo = (data) => {
  return post("/users", data);
};
