import '../Admin.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../AdminComponents';

const AddCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (response.ok) navigate('/admin2');
  };

  return (
    <div className="admin-content">
      <Sidebar />
      <div className="add-category-container">
        <div className="add-category-box">
          <h2 className="text-2xl font-bold text-center mb-4">Add Category</h2>
          <form onSubmit={handleAddCategory} className="add-category-form">
            <input 
              type="text" 
              className="add-category-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Category Name" 
              required 
            />
            <button type="submit" className="add-category-button">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
