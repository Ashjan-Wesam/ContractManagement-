import { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  // دالة لجلب البيانات من API
  const fetchData = async () => {
    try {
      // جلب الفئات
      const categoryResponse = await fetch("http://127.0.0.1:8000/api/categories");
      const categoryData = await categoryResponse.json();

      // جلب العقود
      const contractResponse = await fetch("http://127.0.0.1:8000/api/contracts");
      const contractData = await contractResponse.json();

      setCategories(categoryData.categorys);
      setContracts(contractData.contracts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // تشغيل جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Dashboard Overview</h2>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {/* الكروت */}
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h5>Total Categories</h5>
                <p>{categories.length}</p>
              </div>
              <div className="dashboard-card">
                <h5>Pending Contracts</h5>
                <p>{contracts.filter(contract => contract.status === "pending").length}</p>
              </div>
              <div className="dashboard-card">
                <h5>Active Contracts</h5>
                <p>{contracts.filter(contract => contract.status === "active").length}</p>
              </div>
              <div className="dashboard-card">
                <h5>Completed Contracts</h5>
                <p>{contracts.filter(contract => contract.status === "completed").length}</p>
              </div>
            </div>

            {/* جدول العقود الأخيرة */}
            <div className="latest-rentals">
              <h3>Latest Rentals</h3>
              <table>
                <thead>
                  <tr>
                    <th>Rental ID</th>
                    <th>User</th>
                    <th>Device</th>
                    <th>Start Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.slice(0, 5).map((contract) => (
                    <tr key={contract.id}>
                      <td>#{contract.id}</td>
                      <td>{contract.user?.name || "N/A"}</td>
                      <td>{contract.device?.name || "N/A"}</td>
                      <td>{new Date(contract.start_date).toLocaleDateString()}</td>
                      <td>{contract.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
