import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; 
import "../assets/css/AllContract.css";

function AllContract() {
  const { user } = useAuth(); // ✅ Get the logged-in user
  const [contracts, setContracts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contractsPerPage = 6;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contracts")
      .then((response) => response.json())
      .then((data) => {
        // ✅ Filter only contracts related to the logged-in user
        const userContracts = data.contracts.filter(contract => contract.user.id === user.id);
        // ✅ Filter out expired contracts
        const filteredContracts = userContracts.filter(contract => new Date(contract.end_date) >= new Date());
        setContracts(filteredContracts);
      })
      .catch((error) => console.error("Error fetching contracts:", error));
  }, [user]);

  const getExpirationStatus = (endDate) => {
    const today = new Date();
    const expirationDate = new Date(endDate);
    const timeDifference = expirationDate - today;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysRemaining <= 3) return "expired-red";
    if (daysRemaining <= 10) return "expired-yellow";
    return "";
  };

  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = contracts.slice(indexOfFirstContract, indexOfLastContract);
  const totalPages = Math.ceil(contracts.length / contractsPerPage);

  return (
    <div className="device-container">
      <div className="device-content">
        <h2>My Contracts</h2>
        <div className="device-grid">
          {currentContracts.length > 0 ? (
            currentContracts.map((contract) => (
              <div 
                key={contract.id} 
                className={`device-card ${contract.status !== "completed" ? "locked" : ""} ${getExpirationStatus(contract.end_date)}`}
              >
                {contract.status !== "completed" && (
                  <div className="lock-overlay">
                    <i className="fa-solid fa-lock" style={{ color: "#2d2c2c" }}></i>
                  </div>
                )}
                <div className="device-info">
                  <h3 className="device-title">{contract.device.name}</h3>
                  <p className="device-category">${contract.device.price}</p>
                  <p className="device-price">{contract.user.name}</p>
                  <p className="device-price">
                    <span>{contract.start_date}</span> <span style={{ color: "black" }}>to</span> <span>{contract.end_date}</span>
                  </p>
                  <p className="device-status">{contract.status}</p>
                </div>
                <div className="device-image">
                  <img src={contract.device.img || "placeholder.jpg"} alt={contract.device.name} />
                </div>
              </div>
            ))
          ) : (
            <p>No contracts found.</p>
          )}
        </div>

        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllContract;
