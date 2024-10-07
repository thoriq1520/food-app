import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createFood, updateFood, getFoodsById } from '../services/foodService';

const FoodForm = () => {
  const [food, setFood] = useState({ food_name: '', price: '', stock: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchFood = async () => {
        const response = await getFoodsById(id);
        if (response.status === 200) {
          setFood(response.data);
        }
      };

      fetchFood();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateFood(id, food);
    } else {
      await createFood(food);
    }
    navigate('/foods');
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Food' : 'Create Food'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="food_name" className="form-label">Food Name</label>
          <input
            type="text"
            className="form-control"
            id="food_name"
            name="food_name"
            value={food.food_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={food.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={food.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default FoodForm;
