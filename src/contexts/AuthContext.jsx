import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types"; // ✅ إضافة مكتبة prop-types
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUser();
    }
  }, [token]);

  const getUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const register = async (userData) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register", userData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful! Please login.");
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      alert(error.response?.data.message || "Registration failed");
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });

      console.log("Full API Response:", response.data);

      const { token, user } = response.data;

      // تحقق من أن الـ user والدور (role) موجودين في البيانات المستلمة
      if (!user || !user.role) {
        console.error("🚨 Role is missing in user data:", user);
        alert("User role is missing.");
        return;
      }

      setToken(token);
      localStorage.setItem("auth_token", token);

      // ✅ تحديث user بعد setToken لضمان عدم فقدان البيانات
      setUser(user);

      console.log("✅ Extracted user:", user);
      console.log("✅ Extracted role:", user.role);

      // أرجع الـ user ليتم استخدامه في Login.jsx
      return user;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  
  

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ إضافة PropTypes للتحقق من نوع `children`
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
