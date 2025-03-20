import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center" style={{ paddingBottom: "20px" }}>Sign Up</h2>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Full Name" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Phone" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Address" required />
          </div>
          <div className="mb-3">
            <select className="form-select" required>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input type="file" className="form-control" />
          </div>
          <button type="submit" className="btn btn-dark w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
