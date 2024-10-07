import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions, deleteTransaction } from '../services/transactionService';
import EditTransactionModal from './EditTransactionModal'; // Import the modal component

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions(currentPage);
  }, [currentPage]);

  const loadTransactions = async (page) => {
    const response = await getTransactions({ page, limit });
    setTransactions(response.data.data);
    setTotalPages(Number(response.data.meta.totalPage));
  };

  const handleDelete = async (transactionId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (confirmDelete) {
      await deleteTransaction(transactionId);
      loadTransactions(currentPage); // Reload transactions after deletion
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransactionId(transaction.transaction_id); // Set the selected transaction ID
    setShowModal(true); // Show the edit modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Hide the modal
  };

  const handleSave = () => {
    loadTransactions(currentPage); // Reload transactions after saving
  };

  return (
    <div className="container mt-4">
      <h2>Transaction List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Transaction Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}> {/* Using index as the key since we are generating the ID */}
              <td>{index + 1}</td> {/* Generate ID starting from 1 */}
              <td>{transaction.customer.name}</td>
              <td>{transaction.food.food_name}</td>
              <td>{transaction.qty}</td>
              <td>{transaction.total_price}</td>
              <td>{transaction.transaction_date}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(transaction)}>Edit</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(transaction.transaction_id)}>Delete</button>
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

      {/* Edit Transaction Modal */}
      <EditTransactionModal 
        show={showModal} 
        transactionId={selectedTransactionId} 
        onClose={handleModalClose} 
        onSave={handleSave} 
      />
    </div>
  );
}

export default TransactionList;
