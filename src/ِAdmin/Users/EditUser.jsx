import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './EditUser.css';

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

      <div className="edit-user-container">
        <div className="edit-user-wrapper">
          <h2 className="edit-user-title">Edit User</h2>
    
          <form onSubmit={updateUser} className="edit-user-form">
            <div className="edit-user-group">
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                placeholder="Enter Name"
                required
              />
            </div>
    
            <div className="edit-user-group">
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                placeholder="Enter Email"
                required
              />
            </div>
    
            <div className="edit-user-group">
              <select
                value={editedUser.role}
                onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
    
            <div className="edit-user-group">
              <input
                type="text"
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                placeholder="Enter Phone"
                required
              />
            </div>
    
            <div className="edit-user-group">
              <input
                type="text"
                value={editedUser.address}
                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                placeholder="Enter Address"
                required
              />
            </div>
    
            <div className="edit-user-group">
              <input
                type="text"
                value={editedUser.img}
                onChange={(e) => setEditedUser({ ...editedUser, img: e.target.value })}
                placeholder="Enter Image URL"
              />
            </div>
    
            <button type="submit" className="edit-user-button">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
    

};

export default EditUserr;
