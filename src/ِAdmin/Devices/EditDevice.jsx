import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../Admin.css';


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
    <div style={{ paddingTop: "90px" }}>
  <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Edit Device</h2>
  {device ? (
    <form onSubmit={handleUpdate} className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Device Name</label>
        <input
          type="text"
          name="name"
          value={updatedDevice.name}
          onChange={handleInputChange}
          placeholder="Device Name"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Category</label>
        <select
          name="category_id"
          value={updatedDevice.category_id || ""}
          onChange={handleInputChange}
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Description</label>
        <textarea
          name="description"
          value={updatedDevice.description}
          onChange={handleInputChange}
          placeholder="Device Description"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={updatedDevice.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Availability Status</label>
        <select
          name="availability_status"
          value={updatedDevice.availability_status}
          onChange={handleInputChange}
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Availability Status</option>
          <option value="available">Available</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Image URL</label>
        <input
          type="text"
          name="img"
          value={updatedDevice.img}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
      >
        Update Device
      </button>
    </form>
  ) : (
    <p>Loading...</p>
  )}
</div>
  );
};

export default EditDevice;
