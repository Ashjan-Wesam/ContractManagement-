import '../Admin.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../AdminComponents';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categories/${id}`)
      .then(res => res.json())
      .then(data => setName(data.category.name))
      .catch(err => console.error("Error fetching category:", err));
  }, [id]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (response.ok) navigate('/admin2');
  };

  return (
    <div className="admin-content">
      <Sidebar />
      <div className="edit-category-container">
        <div className="edit-category-box">
          <h2 className="text-2xl font-bold text-center mb-4">Edit Category</h2>
          <form onSubmit={handleUpdateCategory}>
            <input 
              type="text" 
              className="edit-category-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <button type="submit" className="edit-category-button">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
