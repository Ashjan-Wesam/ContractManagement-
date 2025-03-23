import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
    

      {/* محتوى الداشبورد */}
      <div className="dashboard-content">
        <h2 className="dashboard-title">Dashboard Overview</h2>

        {/* الكروت */}
        <div className="dashboard-cards">
          <div className="dashboard-card ">
            <h5>Total Users</h5>
            <p>1,245</p>
          </div>
          <div className="dashboard-card ">
            <h5>Active Devices</h5>
            <p>320</p>
          </div>
          <div className="dashboard-card ">
            <h5>Categories</h5>
            <p>15</p>
          </div>
          <div className="dashboard-card ">
            <h5>Pending Contracts</h5>
            <p>12</p>
          </div>
        </div>

        {/* جدول آخر الاستجارات */}
        <div className="latest-rentals">
          <h3>Latest Rentals</h3>
          <table>
            <thead>
              <tr>
                <th>Rental ID</th>
                <th>User</th>
                <th>Item</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>John Doe</td>
                <td>Laptop</td>
                <td>March 20, 2025</td>
                <td>Approved</td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Jane Smith</td>
                <td>Camera</td>
                <td>March 19, 2025</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>#003</td>
                <td>Ali Hassan</td>
                <td>Projector</td>
                <td>March 18, 2025</td>
                <td>Rejected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
