import { Link } from "react-router-dom";
import "./sidecbar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin" className="sidebar-link">Users</Link>
        </li>
        <li>
          <Link to="/admin1" className="sidebar-link">Devices</Link>
        </li>
        <li>
          <Link to="/admin2" className="sidebar-link">Categories</Link>
        </li>
        <li>
          <Link to="/admin5" className="sidebar-link">Contracts</Link>
        </li>
      </ul>
      <button className="logou-btn">Logout</button>
    </div>
  );
}

export default Sidebar;
