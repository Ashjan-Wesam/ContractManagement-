import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../Admin.css";
import Sidebar from "../AdminComponents";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const devicesPerPage = 2;

  useEffect(() => {
    fetchDevices();
  }, [currentPage]);

  const fetchDevices = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/devices?page=${currentPage}`);
      setDevices(response.data.devices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/devices/${id}`);
          setDevices(devices.filter((device) => device.id !== id));
          Swal.fire("Deleted!", "The device has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting device:", error);
        }
      }
    });
  };

  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);
  const totalPages = Math.ceil(devices.length / devicesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-content">
      <Sidebar />
      <div className="categories-container">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Device List</h2>

          {/* Add New Device Button */}
          <Link
            to="/admin6"
            className="block w-full text-center py-2 px-4 rounded-md shadow-md mb-6"
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
              transition: "0.3s",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "gray"}
            onMouseOut={(e) => e.target.style.backgroundColor = "black"}
          >
            Add New Device
          </Link>

          <h4 className="text-xl font-semibold mb-4">Available Devices</h4>

          {/* Device Cards */}
          <div>
            {currentDevices.length > 0 ? (
              currentDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-4 mb-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                >
                  <img
                    src={device.img || "https://via.placeholder.com/150"}
                    alt={device.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{device.name}</h3>
                    <p className="text-gray-600 text-sm">{device.description}</p>
                    <p className="text-blue-600 font-bold">Price: ${device.price}</p>
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full mt-2 ${
                        device.availability_status === "available"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {device.availability_status}
                    </span>
                  </div>
                  <div className="space-x-2">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(device.id)}
                      className="py-2 px-4 rounded-md shadow-md"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#b30000"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "red"}
                    >
                      Delete
                    </button>

                    <Link
                      to={`/admin7/${device.id}`}
                      className="py-2 px-4 rounded-md shadow-md"
                      style={{
                        backgroundColor: "#2bcc91",
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#2bcc91"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#2bcc91"}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No devices available.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {devices.length > 2 && (
            <div className="pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceList;
