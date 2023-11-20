import { del, get } from "../AxiosInstance";

export const getAllCustomers = () => {
  return get("customeradmin");
};

export const getCustomerById = (customerId) => {
  return get(`customeradmin/${customerId}`);
};

export const deleteCustomer = (customerId) => {
  return del(`customeradmin/${customerId}`);
};

export const restoreCustomer = (customerId) => {
  return get(`customeradmin/restore/${customerId}`);
};