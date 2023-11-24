import { get } from "../AxiosInstance";

export const getCatalogItems = () => {
  return get("/StoreCatalog");
};
