import axios from 'axios';

//nest
// const API_URL = 'http://localhost:3002/api/transactions';

//express
const API_URL = 'http://localhost:3001/api/transactions';

export const getTransactions = async ({ page, limit }) => {
    return await axios.get(API_URL, {
      params: { page, limit },
    });
  };

export const getTransactionsById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  };

export const createTransaction = async (transactionData) => {
  return await axios.post(API_URL, transactionData);
};

export const updateTransaction = async (id, transactionData) => {
  return await axios.put(`${API_URL}/${id}`, transactionData);
};

export const deleteTransaction = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
