import AdminComponents from "./AdminComponents";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  return (
<div style={{ display: "flex" , gap: "100px" }}>
    <div><AdminComponents /></div>

    <div className="container mt-4">
      <h2 className="mb-4">Dashboard Overview</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">1,245</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Active Devices</h5>
              <p className="card-text">320</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <p className="card-text">15</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending Contracts</h5>
              <p className="card-text">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
