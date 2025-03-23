import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddUser.css';

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    img: "",
  });
  const [error, setError] = useState(null);  
  const navigate = useNavigate();

  const addUser = (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role || !newUser.phone || !newUser.address) {
      setError("Please fill in all the fields");
      return;
    }

    fetch("http://127.0.0.1:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from API:", data);
        if (data.status === 201) {
          navigate("/admin");  
        } else {
          setError(data.message || "Failed to add user. Please check the inputs.");
        }
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        setError(`An error occurred: ${error.message || error}`);
      });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Add New User</h2>
  
      {error && <p className="error-message">{error}</p>}
  
      <form onSubmit={addUser} className="form">
        <div className="form-group">
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Enter Name"
            required
          />
        </div>
  
        <div className="form-group">
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Enter Email"
            required
          />
        </div>
  
        <div className="form-group">
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="Enter Password"
            required
          />
        </div>
  
        <div className="form-group">
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
  
        <div className="form-group">
          <input
            type="text"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            placeholder="Enter Phone"
            required
          />
        </div>
  
        <div className="form-group">
          <input
            type="text"
            value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            placeholder="Enter Address"
            required
          />
        </div>
  
        <div className="form-group">
        
          <input
            type="text"
            value={newUser.img}
            onChange={(e) => setNewUser({ ...newUser, img: e.target.value })}
            placeholder="Enter Image URL"
          />
        </div>
  
        <button type="submit" className="submit-button">
          Add User
        </button>
      </form>
    </div>
  
  
  
  );
};

export default AddUser;
