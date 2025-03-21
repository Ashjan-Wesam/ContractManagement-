import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Device.css";

function Device() {
    const [devices, setDevices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const devicesPerPage = 6;

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/devices")
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data.devices)) {
              setDevices(data.devices);
            } else {
              console.error("Unexpected data format:", data);
              setDevices([]);
            }
          })
          .catch((err) => console.error("Error fetching devices:", err));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/categories")
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data.categorys)) {
              setCategories(data.categorys);
            } else {
              console.error("Unexpected categories format:", data);
              setCategories([]);
            }
          })
          .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const filteredDevices = devices.filter(
        (device) =>
          device.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === "" || device.category?.name === category) &&
          (price === "" || parseFloat(device.price) <= parseFloat(price))
    );
    const indexOfLastDevice = currentPage * devicesPerPage;
    const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
    const currentDevices = filteredDevices.slice(indexOfFirstDevice, indexOfLastDevice);

    const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);

    return (
      <div className="device-container">
        <div className="device-content">
          <div className="device-filters">
            <input 
              type="text" 
              placeholder="Search devices..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="search-input"
            />
            <select onChange={(e) => setCategory(e.target.value)} className="category-select">
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <input 
              type="number" 
              placeholder="Max Price" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="price-input"
            />
          </div>
          <div className="device-grid">
            {filteredDevices.map((device) => (
              <div key={device.id} className="device-card">
                <h3 className="device-title">{device.name}</h3>
                <p className="device-category">{device.category?.name || "Unknown Category"}</p>
                <p className="device-price">${device.price}</p>
                <Link to={`/device/${device.id}`} className="device-link">
                  <button className="device-button">View Details</button>
                </Link>
              </div>
            ))}
          </div>
          <div className="pagination">
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
        </div>
      </div>
    );
}

export default Device;
