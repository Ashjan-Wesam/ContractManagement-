import React, { useState, useEffect } from "react";
import '../Admin.css';

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
    <div style={{ paddingTop: "90px" }}>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Contracts Management</h2>

        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-4 text-left">User Name</th>
              <th className="p-4 text-left">Device Name</th>
              <th className="p-4 text-left">Start Date</th>
              <th className="p-4 text-left">End Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id} className="border-b">
                <td className="p-4">{contract.user ? contract.user.name : "N/A"}</td>
                <td className="p-4">{contract.device ? contract.device.name : "N/A"}</td>
                <td className="p-4">{contract.start_date}</td>
                <td className="p-4">{contract.end_date}</td>
                <td className="p-4">
                  <select
                    value={contract.status}
                    onChange={(e) => handleStatusChange(contract.id, e.target.value)}
                    className="p-2 border-2 border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500"
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
