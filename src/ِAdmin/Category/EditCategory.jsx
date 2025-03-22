import '../Admin.css';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categories/${id}`)
      .then(res => res.json())
      .then(data => setName(data.category.name));
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
    <div style={{ paddingTop: "90px" }}>
      <h2>Edit Category</h2>
      <form onSubmit={handleUpdateCategory}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCategory;
