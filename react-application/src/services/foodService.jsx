import axios from 'axios';

//nest
// const API_URL = 'http://localhost:3002/api/foods';

//express
const API_URL = 'http://localhost:3001/api/foods';

export const getFoods = async ({ page, limit }) => {
    return await axios.get(API_URL, {
      params: { page, limit },
    });
  };

export const getFoodsById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  };

export const createFood = async (foodData) => {
  return await axios.post(API_URL, foodData);
};

export const updateFood = async (id, foodData) => {
  return await axios.put(`${API_URL}/${id}`, foodData);
};

export const deleteFood = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
