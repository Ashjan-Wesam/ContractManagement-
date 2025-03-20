<<<<<<< HEAD
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Dont have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
=======
export default function Login() {
    return (
      <div className="">
        <h2 className="">Login</h2>
        <form className="">
          <input type="email" placeholder="Email" className="" />
          <input type="password" placeholder="Password" className="" />
          <button className="">Login</button>
        </form>
      </div>
    );
  }
>>>>>>> 8d8795f7fe3b04d050fcc405b379e17d741f5f81
