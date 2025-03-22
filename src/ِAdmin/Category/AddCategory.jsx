import '../Admin.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ paddingTop: "90px" }}>
      <h2>Add Category</h2>
      <form onSubmit={handleAddCategory}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCategory;