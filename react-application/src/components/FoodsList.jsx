import React, { useEffect, useState } from "react";
import { getFoods, deleteFood } from "../services/foodService";
import { Link, useNavigate } from "react-router-dom";
import EditFoodModal from "./EditFoodsListModal";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    loadFoods(currentPage);
  }, [currentPage]);

  const loadFoods = async (page) => {
    const response = await getFoods({ page, limit });
    setFoods(response.data.data);
    setTotalPages(Number(response.data.meta.totalPage));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (confirmDelete) {
      try {
        await deleteFood(id);
        loadFoods(currentPage);
        setErrorMessage("");
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setErrorMessage(
            `Food dengan id ${id} tidak dapat dihapus karena masih ada transaksi.`
          );
        } else {
          setErrorMessage(
            "Terjadi kesalahan saat menghapus food. Silakan coba lagi."
          );
        }
      }
    }
  };

  const handleEdit = (id) => {
    setSelectedFoodId(id);
    setShowEditModal(true);
  };

  const handleSave = () => {
    loadFoods(currentPage);
  };

  return (
    <div className="container mt-4">
      <h2>Food List</h2>

      {/* Error Message Display */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Number</th>
            <th>Food Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{food.food_name}</td>
              <td>{food.price}</td>
              <td>{food.stock}</td>
              <td>
                <button
                  onClick={() => handleEdit(food.food_id)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(food.food_id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
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
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
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
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>

      {/* Edit Food Modal */}
      <EditFoodModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        foodId={selectedFoodId}
        onSave={handleSave}
      />
    </div>
  );
};

export default FoodList;
