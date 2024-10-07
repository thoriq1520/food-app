import React, { useEffect, useState } from 'react';
import { getTransactionsById, updateTransaction } from '../services/transactionService';
import { getCustomers } from '../services/customerService';
import { getFoods } from '../services/foodService';

function EditTransactionModal({ show, onClose, transactionId, onSave }) {
  const [transaction, setTransaction] = useState({
    transaction_id: '',
    qty: '',
    total_price: '',
    transaction_date: '',
    customer: {
      customer_id: '',
      name: '',
    },
    food: {
      food_id: '',
      food_name: '',
    }
  });
  
  const [customers, setCustomers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [limit] = useState(1000);

  useEffect(() => {
    if (transactionId && show) {
      fetchTransaction(transactionId);
      fetchCustomers(1, limit);  
      fetchFoods(1, limit); 
    }
  }, [transactionId, show, limit]); 

  const fetchTransaction = async (id) => {
    const response = await getTransactionsById(id);
    setTransaction(response.data.data);
  };

  const fetchCustomers = async (page = 1, limit) => {
    console.log('Fetching customers with limit:', limit);
    const response = await getCustomers({ page, limit });
    setCustomers(response.data.data);
  };

  const fetchFoods = async (page = 1, limit) => {
    console.log('Fetching foods with limit:', limit);
    const response = await getFoods({ page, limit });
    setFoods(response.data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customer.customer_id") {
      setTransaction({
        ...transaction,
        customer: {
          ...transaction.customer,
          customer_id: value
        }
      });
    } else if (name === "food.food_id") {
      setTransaction({
        ...transaction,
        food: {
          ...transaction.food,
          food_id: value
        }
      });
    } else {
      setTransaction({ ...transaction, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTransaction = {
      customer_id: transaction.customer.customer_id,
      food_id: transaction.food.food_id,
      qty: transaction.qty,
      total_price: transaction.total_price,
      transaction_date: transaction.transaction_date
    };
    await updateTransaction(transactionId, updatedTransaction);
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
            <h5 className="modal-title">Edit Transaction</h5>
            <button type="button" className="close ms-auto" onClick={onClose} aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="qty" value={transaction.qty} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Total Price</label>
                <input type="number" name="total_price" value={transaction.total_price} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Transaction Date</label>
                <input type="date" name="transaction_date" value={transaction.transaction_date} onChange={handleChange} className="form-control" required />
              </div>

              {/* Customer Dropdown */}
              <div className="form-group">
                <label>Customer</label>
                <select name="customer.customer_id" value={transaction.customer.customer_id} onChange={handleChange} className="form-control" required>
                  <option value="">Select a customer</option>
                  {customers.map((customer) => (
                    <option key={customer.customer_id} value={customer.customer_id}>{customer.name}</option>
                  ))}
                </select>
              </div>

              {/* Food Dropdown */}
              <div className="form-group">
                <label>Food</label>
                <select name="food.food_id" value={transaction.food.food_id} onChange={handleChange} className="form-control" required>
                  <option value="">Select a food item</option>
                  {foods.map((food) => (
                    <option key={food.food_id} value={food.food_id}>{food.food_name}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTransactionModal;
