import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/DeviceDetails.css";

function DeviceDetails() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    start_date: "",
    end_date: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/devices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDevice(data.device);
      })
      .catch((err) => console.error("Error fetching device details:", err));
  }, [id]);

  useEffect(() => {
    if (formData.start_date && formData.end_date) {
      calculateTotalPrice(formData.start_date, formData.end_date);
    }
  }, [formData.start_date, formData.end_date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const calculateTotalPrice = (startDate, endDate) => {
    if (startDate && endDate && device?.price) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = (end - start) / (1000 * 60 * 60 * 24);
      if (days > 0) {
        const dailyRate = device.price;
        setTotalPrice((dailyRate * days).toFixed(2));
      } else {
        setTotalPrice(0);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending contract request:", {
        user_id: 1,
        device_id: id,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: "pending",
      });
      
    fetch("http://127.0.0.1:8000/api/contracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        device_id: id,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: "pending",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Contract request submitted:", data);
        setShowPopup(false);
        alert("Your rental request has been sent to the admin.");
      })
      .catch((err) => console.error("Error submitting contract request:", err));
  };

  if (!device) return <p>Loading device details...</p>;

  return (
    <div className="device-details-container">
      <h2>{device.name}</h2>
      <img src={device.img || "default-image.jpg"} alt={device.name} className="device-image" />
      <p className="device-category">Category: {device.category?.name || "Unknown"}</p>
      <p className="device-description">Description: {device.description}</p>
      <p className="device-price">Price per Day: ${device.price}</p>
      <p className="device-status">Status: {device.availability_status === "available" ? "Available" : "Out of Stock"}</p>
      <button className="rent-button" onClick={() => setShowPopup(true)} disabled={device.availability_status !== "available"}>
        Rent Now
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Rental Form</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Your Email" onChange={handleInputChange} required />
              <input type="text" name="address" placeholder="Your Address" onChange={handleInputChange} required />

              <input
                type="date"
                name="start_date"
                min={new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                required
              />

              <input
                type="date"
                name="end_date"
                min={formData.start_date || new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                required
              />

              <p>Total Price: ${totalPrice}</p>
              <div className="Btns">
                <button type="submit">Submit Request</button>
                <button className="close-button" onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceDetails;
