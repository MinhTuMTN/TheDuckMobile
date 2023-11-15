import { get } from "./AxiosInstance";

export const getAllCatalog = () => {
  return get("catalog");
};

export const getCatalogByCatalogURL = (catalogURL) => {
  return get(`catalog/${catalogURL}`);
};

export const getCatalogProductFilter = (catalogURL, filter) => {
  return get(`catalog/${catalogURL}/products`, filter);
};
