import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Admin.css";

const EditDevice = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [updatedDevice, setUpdatedDevice] = useState({});
  const [categories, setCategories] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const deviceResponse = await axios.get(`http://127.0.0.1:8000/api/devices/${id}`);
        setDevice(deviceResponse.data.device);
        setUpdatedDevice(deviceResponse.data.device);

        const categoriesResponse = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(categoriesResponse.data.categorys);
      } catch (error) {
        console.error("Error fetching device:", error);
      }
    };
    fetchDevice();
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedDevice({ ...updatedDevice, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedDeviceWithCategoryId = { ...updatedDevice };
      await axios.put(`http://127.0.0.1:8000/api/devices/${id}`, updatedDeviceWithCategoryId);
      history("/admin1");
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  return (
    <div className="admin-content">
      <div className="form-container" style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Edit Device</h2>

        {device ? (
          <form onSubmit={handleUpdate}>
            {/* Device Name */}
            <div className="form-group">
              <label style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "8px" }}>Device Name</label>
              <input
                type="text"
                name="name"
                value={updatedDevice.name}
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
                value={updatedDevice.category_id}
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
                value={updatedDevice.description}
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
                value={updatedDevice.price}
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
                value={updatedDevice.availability_status}
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
                value={updatedDevice.img}
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
              Update Device
            </button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EditDevice;
