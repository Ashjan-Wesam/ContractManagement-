// components/Navbar.js
import { Link } from "react-router-dom";
import './Admin.css';

function Sidebar() {
  return (
    <div  className="w-full bg-gray-800 text-white p-5 fixed top-0 left-0 z-10">
      <ul  className="flex space-x-4 ">
        <li>
          <Link style={{ color:"#11e697" }} to="/admin" className="block p-2">Users</Link>
        </li>
        <li>
          <Link style={{ color:"#11e697" }} to="/admin1" className="block p-2">Devices</Link>
        </li>
        <li>
          <Link style={{ color:"#11e697" }} to="/admin2" className="block p-2">Categories</Link>
        </li>
        <li>
          <Link style={{ color:"#11e697" }} to="/admin5" className="block p-2">Contracts</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
