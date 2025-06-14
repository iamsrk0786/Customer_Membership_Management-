import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/customers`;

export const getCustomers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createCustomer = async (data) => {
  const res = await axios.post(`${API_URL}/add`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateCustomer = async (id, data) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteCustomer = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
};
