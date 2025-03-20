import { useState, useEffect } from "react";

export default function RentalPage() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error("Error fetching devices:", err));
  }, []);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || device.category === category)
  );

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <input 
          type="text" 
          placeholder="Search devices..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ padding: "8px", width: "200px" }}
        />
        <select onChange={(e) => setCategory(e.target.value)} style={{ padding: "8px" }}>
          <option value="">All</option>
          <option value="Laptop">Laptop</option>
          <option value="Tablet">Tablet</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {filteredDevices.map((device) => (
          <div key={device.id} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{device.name}</h3>
            <p>{device.category}</p>
            <p style={{ color: "gray" }}>{device.price}</p>
            <button 
              onClick={() => {
                setSelectedDevice(device);
                setShowForm(true);
              }}
              style={{ marginTop: "8px", padding: "8px 16px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px" }}
            >
              Rent Now
            </button>
          </div>
        ))}
      </div>
      {showForm && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "24px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", borderRadius: "8px" }}>
          <h2>Rent {selectedDevice?.name}</h2>
          <form>
            <label style={{ display: "block", marginBottom: "8px" }}>Rental Duration:</label>
            <select style={{ padding: "8px", width: "100%" }}>
              <option value="1 week">1 Week</option>
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
            </select>
            <button 
              type="submit" 
              style={{ marginTop: "16px", padding: "8px 16px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px", width: "100%" }}
            >
              Submit Contract
            </button>
          </form>
          <button 
            onClick={() => setShowForm(false)} 
            style={{ marginTop: "8px", padding: "8px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px" }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
