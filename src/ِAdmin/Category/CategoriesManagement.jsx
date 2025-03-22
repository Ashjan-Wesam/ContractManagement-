import '../Admin.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data.categorys || []))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleDeleteCategory = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          setCategories(categories.filter(category => category.id !== id));
        })
        .catch(error => console.error('Error deleting category:', error));
    }
  };

  return (
    <div style={{ paddingTop: "90px" }}>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Categories Management</h2>
        
        <Link
          to="/admin3"
          className="bg-blue-600 text-white p-3 rounded-md mb-6 inline-block shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add New Category
        </Link>

        <h4 className="text-xl font-semibold mb-4">Current Categories</h4>
        <div>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 mb-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
                <span className="font-medium">{category.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md text-sm hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin4/${category.id}`}
                    className="bg-yellow-600 text-white py-2 px-4 rounded-md text-sm hover:bg-yellow-700 transition duration-300"
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
      </div>
    </div>
  );
};

export default CategoriesManagement;
