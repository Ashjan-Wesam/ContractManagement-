import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Admin.css';


const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/devices");
      setDevices(response.data.devices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/devices/${id}`);
      setDevices(devices.filter(device => device.id !== id));
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  return (
   
    <div style={{ paddingTop: "90px" }}>
  <h2 className="text-2xl font-bold text-center mb-4">Device List</h2>
  <Link
    to="/admin6"
    className="bg-blue-600 text-white p-3 rounded-md mb-4 inline-block shadow-md hover:bg-blue-700 transition duration-300"
  > Add New Device
  </Link>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {devices.length > 0 ? (
      devices.map((device) => (
        <div key={device.id} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition duration-200">
          <img
            src={device.img || "https://via.placeholder.com/150"}
            alt={device.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold">Device Name: {device.name}</h2>
          <p className="text-gray-700">Description: {device.description}</p>
          <p className="text-blue-500 font-bold">Price: ${device.price}</p>
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full mt-2 ${
              device.availability_status === "available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {device.availability_status}
          </span>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => handleDelete(device.id)}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              Delete
            </button>
            <Link
              to={`/admin7/${device.id}`}
              className="text-blue-500 hover:text-blue-700 transition duration-200"
            >
              Edit
            </Link>
          </div>
        </div>
      ))
    ) : (
      <p>No devices found.</p>
    )}
  </div>
</div>

  );
};

export default DeviceList;
