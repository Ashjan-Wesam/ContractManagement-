// Layout.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Contracts from "./Pages/Contracts";
import AdminDashboard from "./ِAdmin/Users/AdminDashboard";
import DeviceList from "./ِAdmin/Devices/DeviceList";
import CategoriesManagement from "./ِAdmin/Category/CategoriesManagement";
import AddCategory from "./ِAdmin/Category/AddCategory";
import EditCategory from "./ِAdmin/Category/EditCategory";
import ContractsList from "./ِAdmin/Contract/ContractManagement";
import AddDevice from "./ِAdmin/Devices/AddDevice";
import EditDevice from "./ِAdmin/Devices/EditDevice";
import Sidebar from "./ِAdmin/AdminComponents";
import AddUser from "./ِAdmin/Users/AddUser";
import EditUser from "./ِAdmin/Users/EditUser";

function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen">
      {/* إخفاء الـ Header فقط لصفحات الأدمن */}
      {!isAdminPage && <Header />}

      <main className="flex-grow flex">
        {isAdminPage && <Sidebar />}
        
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contracts" element={<Contracts />} />
            
            {/* صفحات الأدمن */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin1" element={<DeviceList />} />
            <Route path="/admin2" element={<CategoriesManagement />} />
            <Route path="/admin3" element={<AddCategory />} />
            <Route path="/admin4/:id" element={<EditCategory />} />
            <Route path="/admin5" element={<ContractsList />} />
            <Route path="/admin6" element={<AddDevice />} />
            <Route path="/admin7/:id" element={<EditDevice />} />

            <Route path="/admin8" element={<AddUser />} />
            <Route path="/admin9/:id" element={<EditUser />} />

          </Routes>
        </div>
      </main>

      {/* إخفاء الـ Footer فقط لصفحات الأدمن */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
