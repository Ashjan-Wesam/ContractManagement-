import { NavLink, useNavigate } from "react-router-dom";
import "./sidecbar.css";
import { useAuth } from "../contexts/AuthContext"; 

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    { path: "/admin10", label: "Dashboard" },
    { path: "/admin", label: "Users" },
    { path: "/admin1", label: "Devices" },
    { path: "/admin2", label: "Categories" },
    { path: "/admin5", label: "Contracts" },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <span className="user-name">{user ? user.name : "Guest"}</span>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} className="sidebar-link" activeClassName="active">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default Sidebar;
