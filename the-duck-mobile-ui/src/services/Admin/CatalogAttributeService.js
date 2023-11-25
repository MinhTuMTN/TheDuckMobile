import { del, get, post, put } from "../AxiosInstance";

export const getCatalogAttributesByCatalogId = (catalogId) => {
  return get(`CatalogAttributeAdmin?catalogId=${catalogId}`);
};

export const addCatalogAttributeValue = (attributeId, selectionValue) => {
  return post(`CatalogAttributeAdmin/${attributeId}/selection-values`, {
    selectionValue,
  });
};

export const editCatalogAttribute = (attributeId, data) => {
  return put(`CatalogAttributeAdmin/${attributeId}`, data);
};

export const deleteCatalogAttribute = (attributeId) => {
  return del(`CatalogAttributeAdmin/${attributeId}`);
};

export const addCatalogAttribute = (data) => {
  return post("CatalogAttributeAdmin", data);
};

export const deleteSelectionValue = (attributeId, selectionValueId) => {
  return del(
    `CatalogAttributeAdmin/${attributeId}/selection-values/${selectionValueId}`
  );
};
