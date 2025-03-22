import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Admin.css';


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
      history("/");  
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  return (
    <div style={{ paddingTop: "90px" }}>
    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add New Device</h2>
    <form onSubmit={handleAdd} className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Device Name</label>
        <input
          type="text"
          name="name"
          value={newDevice.name}
          onChange={handleInputChange}
          placeholder="Enter Device Name"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Category</label>
        <select
          name="category_id"
          value={newDevice.category_id}
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
          value={newDevice.description}
          onChange={handleInputChange}
          placeholder="Enter Device Description"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={newDevice.price}
          onChange={handleInputChange}
          placeholder="Enter Price"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Availability Status</label>
        <select
          name="availability_status"
          value={newDevice.availability_status}
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
          value={newDevice.img}
          onChange={handleInputChange}
          placeholder="Enter Image URL"
          className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
      >
        Add Device
      </button>
    </form>
  </div>
  );
};

export default AddDevice;
