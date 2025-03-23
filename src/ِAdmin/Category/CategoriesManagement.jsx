import '../Admin.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../AdminComponents';
import Swal from 'sweetalert2';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 2;

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data.categorys || []))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Red color for delete
      cancelButtonColor: "#3085d6", // Blue color for cancel
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/api/categories/${id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(() => {
            setCategories(categories.filter(category => category.id !== id));
            Swal.fire("Deleted!", "The category has been deleted.", "success");
          })
          .catch(error => console.error('Error deleting category:', error));
      }
    });
  };

  // Pagination Logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-content">
      <Sidebar />
      <div className="categories-container">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Categories Management</h2>

          {/* Add New Category Button */}
          <Link
            to="/admin3"
            className="block w-full text-center py-2 px-4 rounded-md shadow-md mb-6"
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
              transition: "0.3s",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "gray"}
            onMouseOut={(e) => e.target.style.backgroundColor = "black"}
          >
            Add New Category
          </Link>

          <h4 className="text-xl font-semibold mb-4">Current Categories</h4>
          <div>
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 mb-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
                  <span className="font-medium">{category.name}</span>
                  <div className="space-x-2">
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="py-2 px-4 rounded-md shadow-md"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#b30000"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "red"}
                    >
                      Delete
                    </button>

                    {/* Edit Button */}
                    <Link
                      to={`/admin4/${category.id}`}
                      className="py-2 px-4 rounded-md shadow-md"
                      style={{
                        backgroundColor: "#2bcc91n",
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#2bcc91"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#2bcc91"}
                    >
                      Edit
                    </Link>
                    
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No categories available.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {categories.length > 2 && (
            <div className="pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;
