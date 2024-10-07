import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../services/transactionService';
import { getCustomers } from '../services/customerService';
import { getFoods } from '../services/foodService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

function CreateTransaction() {
  const [transaction, setTransaction] = useState({
    customer_id: '',
    food_id: '',
    qty: '',
    total_price: '',
    transaction_date: ''
  });

  const [customers, setCustomers] = useState([]);
  const [foods, setFoods] = useState([]); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers(); 
    fetchFoods();
  }, []);

  const fetchCustomers = async () => {
    const response = await getCustomers({ page: 1, limit: 1000 });
    setCustomers(response.data.data);
  };

  const fetchFoods = async () => {
    const response = await getFoods({ page: 1, limit: 1000 });
    setFoods(response.data.data); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleDateChange = (date) => {
    setTransaction({ ...transaction, transaction_date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTransaction(transaction);
    alert('Transaction created successfully!');
    navigate('/'); 
  };

  const handleBackToHome = () => {
    navigate('/'); 
  };

  return (
    <div className="container mt-4">
      <h2>Create New Transaction</h2>
      <form onSubmit={handleSubmit}>
        {/* Customer Dropdown */}
        <div className="mb-3">
          <label htmlFor="customer_id" className="form-label">Customer</label>
          <select
            className="form-control"
            name="customer_id"
            value={transaction.customer_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>{customer.name}</option>
            ))}
          </select>
        </div>

        {/* Food Dropdown */}
        <div className="mb-3">
          <label htmlFor="food_id" className="form-label">Food</label>
          <select
            className="form-control"
            name="food_id"
            value={transaction.food_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a food item</option>
            {foods.map((food) => (
              <option key={food.food_id} value={food.food_id}>{food.food_name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="qty" className="form-label">Quantity</label>
          <input type="number" className="form-control" name="qty" value={transaction.qty} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="total_price" className="form-label">Total Price</label>
          <input type="number" className="form-control" name="total_price" value={transaction.total_price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="transaction_date" className="form-label">Transaction Date</label>
          <div>
            <DatePicker
              selected={transaction.transaction_date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd" // Format to match the expected input
              className="form-control" // Ensures consistent size with other fields
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Create Transaction</button>
      </form>

      {/* Back to Home Button */}
      <div className="mt-3">
        <button className="btn btn-dark" onClick={handleBackToHome}>Back to Home</button>
      </div>
    </div>
  );
}

export default CreateTransaction;
