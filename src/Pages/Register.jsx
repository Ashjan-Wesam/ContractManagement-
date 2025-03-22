

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/reg.css"; 


const RegisterPage = () => {
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password_confirmation: "",
    img: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  // تحديث البيانات عند الكتابة في الحقول
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // التعامل مع تحميل الصورة ومعاينتها
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, img: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    let validationErrors = {};
    if (!userData.name) validationErrors.name = "Name is required";
    if (!userData.email) validationErrors.email = "Email is required";
    if (!userData.phone) validationErrors.phone = "Phone number is required";
    if (!userData.address) validationErrors.address = "Address is required";
    if (!userData.password) validationErrors.password = "Password is required";
    if (userData.password !== userData.password_confirmation)
      validationErrors.password_confirmation = "Passwords do not match";
    if (!userData.img) validationErrors.img = "Profile image is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // عند إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    await register(formData);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px"}}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {["name", "email", "phone", "address"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                className="form-control"
                value={userData[field]}
                onChange={handleChange}
              />
              {errors[field] && <p className="text-danger">{errors[field]}</p>}
            </div>
          ))}

          {["password", "password_confirmation"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field.replace("_", " ")}</label>
              <input
                type="password"
                name={field}
                className="form-control"
                value={userData[field]}
                onChange={handleChange}
              />
              {errors[field] && <p className="text-danger">{errors[field]}</p>}
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input type="file" name="img" className="form-control" accept="image/*" onChange={handleImageChange} />
            {errors.img && <p className="text-danger">{errors.img}</p>}
          </div>

          {preview && (
            <div className="mb-3 text-center">
              <img src={preview} alt="Preview" className="img-thumbnail" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
            </div>
          )}
<button
  type="submit"
  className="custom-btn w-100"
>


            Register
          </button>        </form>
          <div className="text-center">
          <p>Already have an account? <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
