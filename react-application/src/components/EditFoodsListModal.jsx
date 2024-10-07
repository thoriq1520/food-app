import React, { useEffect, useState } from 'react';
import { getFoodsById, updateFood } from '../services/foodService';

function EditFoodsListModal({ show, onClose, foodId, onSave }) {
  const [food, setFood] = useState({
    food_name: '',
    price: '',
    stock: ''
  });
  const [limit] = useState(1000);

  useEffect(() => {
    if (foodId && show) {
      fetchFood(foodId);
    }
  }, [foodId, show]);

  const fetchFood = async (id) => {
    const response = await getFoodsById(id); // Pass id directly, not as an object
    console.log('ini respon ', response.data)
    setFood(response.data.data);
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFood(foodId, food); // Assuming the updateFood function is set up correctly
    onSave();
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Food</h5>
            <button type="button" className="close ms-auto" onClick={onClose} aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Food Name</label>
                <input type="text" name="food_name" value={food.food_name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" value={food.price} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" name="stock" value={food.stock} onChange={handleChange} className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFoodsListModal;
