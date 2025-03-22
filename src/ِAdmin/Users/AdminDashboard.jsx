import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Sidecbar.css'; // تعديل هنا

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          } else {
            alert("Failed to delete user");
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("An error occurred while deleting the user.");
        });
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-header">Admin Dashboard</h2>

      {/* Add User Button */}
      <button onClick={() => navigate("/admin8")} className="add-user-btn">
        Add New User
      </button>

      {/* Users Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="action-btn edit-btn" onClick={() => navigate(`/admin9/${user.id}`)}>
                  Edit
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

