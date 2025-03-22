import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../assets/css/reg.css';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!credentials.email) validationErrors.email = "Email is required";
    if (!credentials.password) validationErrors.password = "Password is required";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const user = await login(credentials);

      if (user && user.role) {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setErrors({ general: "There's No user!" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrors({ general: "Invalid email or password" });
        } else {
          setErrors({ general: "Server error, please try again later." });
        }
      } else if (error.request) {
        setErrors({ general: "Network error, please check your connection." });
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto form-container" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {errors.general && <p className="text-danger text-center">{errors.general}</p>}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              required
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={credentials.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <div className="mb-3 text-center">
            <span className="forgot-password"><a href="#">Forgot Password?</a></span>
          </div>

          <button
            type="submit"
            className="custom-btn w-100"
                        disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/register" className="text-decoration-none" style={{ color: "#007bff" }}>Register here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
