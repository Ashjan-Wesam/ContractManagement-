import React, { useState, useEffect } from "react";
import '../sidecbar.css';

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contracts")
      .then((response) => response.json())
      .then((data) => {
        setContracts(data.contracts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contracts:", error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setContracts((prevContracts) =>
      prevContracts.map((contract) =>
        contract.id === id ? { ...contract, status: newStatus } : contract
      )
    );

    fetch(`http://127.0.0.1:8000/api/contracts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedContract) => {
        console.log("Contract updated successfully:", updatedContract);
      })
      .catch((error) => console.error("Error updating contract status:", error));
  };

  if (loading) {
    return <p>Loading contracts...</p>;
  }

  return (
    <div className="contracts-container">
      <div className="contracts-box">
        <h2 className="contracts-title">Contracts Management</h2>
  
        <table className="contracts-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Device Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.user ? contract.user.name : "N/A"}</td>
                <td>{contract.device ? contract.device.name : "N/A"}</td>
                <td>{contract.start_date}</td>
                <td>{contract.end_date}</td>
                <td>
                  <select
                    value={contract.status}
                    onChange={(e) => handleStatusChange(contract.id, e.target.value)}
                    className="contract-status"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default ContractsList;
