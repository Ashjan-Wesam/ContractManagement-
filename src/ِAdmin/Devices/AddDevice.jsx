import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Admin.css";

const AddDevice = () => {
  const [newDevice, setNewDevice] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    availability_status: "",
    img: "",
  });
  const [categories, setCategories] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(response.data.categorys);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setNewDevice({ ...newDevice, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/devices", newDevice);
      history("/admin1");  
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  return (
    <div className="admin-content">
      <div className="form-container" style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Add New Device</h2>

        <form onSubmit={handleAdd}>
          {/* Device Name */}
          <div className="form-group">
            <label style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "8px" }}>Device Name</label>
            <input
              type="text"
              name="name"
              value={newDevice.name}
              onChange={handleInputChange}
              placeholder="Enter Device Name"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px"
              }}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "8px" }}>Category</label>
            <select
              name="category_id"
              value={newDevice.category_id}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px"
              }}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "8px" }}>Description</label>
            <textarea
              name="description"
              value={newDevice.description}
              onChange={handleInputChange}
              placeholder="Enter Device Description"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px",
                height: "100px"
              }}
              required
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "8px" }}>Price</label>
            <input
              type="number"
              name="price"
              value={newDevice.price}
              onChange={handleInputChange}
              placeholder="Enter Price"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px"
              }}
              required
            />
          </div>

          {/* Availability Status */}
          <div className="form-group">
            <label style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "8px" }}>Availability Status</label>
            <select
              name="availability_status"
              value={newDevice.availability_status}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px"
              }}
              required
            >
              <option value="">Select Availability Status</option>
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "8px" }}>Image URL</label>
            <input
              type="text"
              name="img"
              value={newDevice.img}
              onChange={handleInputChange}
              placeholder="Enter Image URL"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "20px"
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1.1rem"
            }}
          >
            Add Device
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDevice;
