import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Admin.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();  // استخدام navigate بدلاً من history

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  }, []);

  const handleDelete = (userId) => {
    // تأكيد الحذف من المستخدم
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // بعد الحذف، تحديث البيانات في الحالة
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
    <div style={{ paddingTop: "90px" }}>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>

        {/* Add User Button */}
        <button
          onClick={() => navigate("/admin8")}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-700"
        >
          Add New User
        </button>

        {/* Users List */}
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {/* Edit Button */}
                  <button
className="px-2 py-1 bg-[#11e697] text-white rounded mx-1" style={{ marginLeft: '2px',backgroundColor: '#11e697' }}
onClick={() => navigate(`/admin9/${user.id}`)}
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
className="px-2 py-1 bg-[#11e697] text-white rounded mx-1" style={{ marginLeft: '2px',backgroundColor: '#11e697' }}

                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
