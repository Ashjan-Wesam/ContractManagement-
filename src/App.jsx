import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Contracts from "./Pages/Contracts";
import AdminDashboard from "./Pages/AdminDashboard";
import Device from "./Pages/Device";
import EditUser from "./Pages/EditUser";
import DeviceDetails from "./Pages/DeviceDetails";
import AllContract from "./Pages/AllContract";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/editProfile" element={<EditUser />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/allContracts" element={<AllContract />} />
              <Route path="/Device" element={<Device />} />
              <Route path="/device/:id" element={<DeviceDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
