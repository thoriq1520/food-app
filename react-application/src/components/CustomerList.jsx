import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../services/customerService'; 
import { Link, useNavigate } from 'react-router-dom';
import EditCustomerModal from './EditCustomerModal'; 

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); 
  const [errorMessage, setErrorMessage] = useState('');
  const limit = 10; 
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers(currentPage);
  }, [currentPage]);

  const loadCustomers = async (page) => {
    const response = await getCustomers({ page, limit });
    if (response.status === 200) {
      setCustomers(response.data.data);
      console.log("acas ", response.data.data);
      setTotalPages(Number(response.meta.totalPage));
      setErrorMessage(''); 
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      try {
        await deleteCustomer(id);
        setErrorMessage(''); 
        loadCustomers(currentPage);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setErrorMessage(`Customer dengan id ${id} tidak dapat dihapus karena masih ada transaksi.`);
        } else {
          setErrorMessage('Terjadi kesalahan saat menghapus customer. Silakan coba lagi.');
        }
      }
    }
  };

  const handleEdit = (id) => {
    setSelectedCustomerId(id);
    setShowEditModal(true);
  };

  const handleSave = () => {
    loadCustomers(currentPage); 
  };

  return (
    <div className="container mt-4">
      <h2>Customer List</h2>

      {/* Error message display */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>
                <button onClick={() => handleEdit(customer.customer_id)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDelete(customer.customer_id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          className="btn btn-secondary" 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button 
          className="btn btn-secondary" 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Back to Home Button */}
      <div className="mt-3">
        <button className="btn btn-dark" onClick={() => navigate('/')}>Back to Home</button>
      </div>

      {/* Edit Customer Modal */}
      <EditCustomerModal 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        customerId={selectedCustomerId} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default CustomerList;
