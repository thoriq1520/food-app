import axios from 'axios';

//nest
// const API_URL = 'http://localhost:3002/api/customers';

//nest
const API_URL = 'http://localhost:3001/api/customers';

export const getCustomers = async ({ page, limit }) => {
    return await axios.get(API_URL, {
      params: { page, limit },
    });
  };

export const getCustomersById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  };

export const createCustomer = async (customerData) => {
  return await axios.post(API_URL, customerData);
};

export const updateCustomer = async (id, customerData) => {
  return await axios.put(`${API_URL}/${id}`, customerData);
};

export const deleteCustomer = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
