import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Admin.css';

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
  const [error, setError] = useState(null);  // حالة لإظهار الأخطاء
  const navigate = useNavigate();

  const addUser = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    // التأكد من أن جميع الحقول مليئة
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
          navigate("/admin");  // الانتقال بعد إضافة المستخدم
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
    <div style={{ paddingTop: "90px" }} className="add-user-container">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600 add-user-title">Add New User</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}  {/* عرض الرسائل الخطأ */}

        <form onSubmit={addUser} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 add-user-grid">
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter Name"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 add-user-input"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter Email"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 add-user-input"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Enter Password"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 add-user-input"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 add-user-select"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Phone</label>
              <input
                type="text"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="Enter Phone"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 add-user-input"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Address</label>
              <input
                type="text"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                placeholder="Enter Address"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 add-user-input"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Image URL</label>
              <input
                type="text"
                value={newUser.img}
                onChange={(e) => setNewUser({ ...newUser, img: e.target.value })}
                placeholder="Enter Image URL"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 add-user-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200 add-user-button"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
