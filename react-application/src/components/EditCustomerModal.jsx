import React, { useEffect, useState } from 'react';
import { getCustomersById, updateCustomer } from '../services/customerService';

function EditCustomerModal({ show, onClose, customerId, onSave }) {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (customerId && show) {
      fetchCustomer(customerId);
    }
  }, [customerId, show]);

  const fetchCustomer = async (id) => {
    const response = await getCustomersById(id);
    console.log('Fetched customer:', response.data);
    setCustomer(response.data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCustomer(customerId, customer);
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
            <h5 className="modal-title">Edit Customer</h5>
            <button type="button" className="close ms-auto" onClick={onClose} aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={customer.name} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={customer.phone} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={customer.address} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerModal;
