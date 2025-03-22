import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../Admin.css';

const EditUserr = () => {
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    img: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // استخدام useEffect لجلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
        const data = await response.json();
        if (data.user) {
          setEditedUser({
            name: data.user.name || "",
            email: data.user.email || "",
            role: data.user.role || "user",
            phone: data.user.phone || "",
            address: data.user.address || "",
            img: data.user.img || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  // دالة تحديث المستخدم
  const updateUser = (e) => {
    e.preventDefault(); // منع إرسال النموذج الافتراضي
  
    fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // إظهار الرسالة بنجاح التحديث
          // alert("User updated successfully!");
      
          // التوجيه إلى صفحة الإدارة مباشرة بعد التحديث
        } else {
          // alert("Error: " + data.message || "Something went wrong!");
          navigate("/admin");

        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };
  
  
  

  return (
    <div style={{ paddingTop: "90px" }}>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Edit User</h2>

        <form onSubmit={updateUser} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* الاسم */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Name</label>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                placeholder="Enter Name"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* البريد الإلكتروني */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Email</label>
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                placeholder="Enter Email"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* الدور */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Role</label>
              <select
                value={editedUser.role}
                onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* الهاتف */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Phone</label>
              <input
                type="text"
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                placeholder="Enter Phone"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* العنوان */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Address</label>
              <input
                type="text"
                value={editedUser.address}
                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                placeholder="Enter Address"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* صورة */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Image URL</label>
              <input
                type="text"
                value={editedUser.img}
                onChange={(e) => setEditedUser({ ...editedUser, img: e.target.value })}
                placeholder="Enter Image URL"
                className="w-full p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserr;
