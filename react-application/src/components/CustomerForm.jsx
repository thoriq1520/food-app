import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, updateCustomer, getCustomersById } from '../services/customerService';

const CustomerForm = () => {
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        const response = await getCustomersById(id);
        if (response.status === 200) {
          setCustomer(response.data);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCustomer(id, customer);
    } else {
      await createCustomer(customer);
    }
    navigate('/customers'); 
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Customer' : 'Create Customer'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default CustomerForm;
