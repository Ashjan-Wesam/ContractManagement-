import { useEffect, useState } from "react";
import "../assets/css/userprofile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200 && data.users.length > 0) {
          setUser(data.users[1]);
        }
      })
      .catch((error) => console.error("Error ", error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center custom-padding">
      <div className="card p-4">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img src={user.img || "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"} height="100" width="100" alt="Profile" style={{borderRadius:"100%"}} />
          </button>
          <span className="name mt-3">{user.name}</span>
          <span className="idd">{user.email}</span>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span className="idd1">ID: {user.id}</span>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">{user.phone} <span className="follow">Phone number</span></span>
          </div>
          <div className="d-flex mt-2">
            <Link to={'editProfile'} className="btn1 btn-dark">Edit Profile</Link>
          </div>
          <div className="text mt-3">
            <span>Address: {user.address}</span>
          </div>
         
          <div className="px-2 rounded mt-4 date">
            <span className="join">Joined {new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
