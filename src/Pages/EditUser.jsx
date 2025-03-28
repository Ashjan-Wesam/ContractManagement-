import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

import "../assets/css/userprofile.css";

export default function EditUser() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const { logout, user: loggedInUser } = useAuth(); // Retrieve logged-in user from AuthContext
  const navigate = useNavigate();

  // Fetch user data based on the logged-in user's ID
  useEffect(() => {
    if (!loggedInUser) {
      // If no logged-in user, redirect or show loading
      navigate("/login"); // Or wherever you want to redirect when no user is logged in
      return;
    }

    fetch(`http://127.0.0.1:8000/api/users/${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setUser(data.user); // Assuming 'data.user' is the logged-in user's data
          setFormData({
            name: data.user.name || "",
            address: data.user.address || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            password: "",
          });
        }
      })
      .catch((error) => console.error("Error fetching user data: ", error));
  }, [loggedInUser, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleDelete = () => {
    if (!user) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/users/${user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then(async (response) => {
            if (response.ok) {
              Swal.fire("Deleted!", "Your account has been deleted.", "success");
              logout();
            } else {
              const data = await response.json();
              Swal.fire("Error!", data.message || "Failed to delete account.", "error");
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setErrors({});

    fetch(`http://127.0.0.1:8000/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          navigate("/profile");
        } else if (data.errors) {
          setErrors(data.errors);
        } else {
          console.error("Error updating user:", data);
        }
      })
      .catch((error) => console.error("Fetch Error:", error));
  };

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center custom-padding">
      <div className="card p-4 shadow-lg rounded">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary rounded-circle p-1">
            <img
              src={user.img || "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}
              height="100"
              width="100"
              alt="Profile"
              className="rounded-circle border border-dark"
            />
          </button>
          <h5 className="mt-3 fw-bold">{formData.name}</h5>
          <span className="text-muted">{formData.email}</span>
          <span className="idd1 text-secondary">ID: {user.id}</span>
        </div>

        <div className="p-3 py-4">
          <h6 className="text-center fw-bold text-dark">Edit Profile</h6>

          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name[0]}</small>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <small className="text-danger">{errors.address[0]}</small>}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email[0]}</small>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <label className="form-label fw-semibold">New Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              {errors.password && <small className="text-danger">{errors.password[0]}</small>}
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-between">
            <button className="btn btn-success px-4 fw-semibold" onClick={handleSave}>Save</button>
            <button className="btn btn-danger px-4 fw-semibold" onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <div className="px-2 rounded mt-4 date text-center">
          <span className="join text-muted">
            Joined {new Date(user.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
