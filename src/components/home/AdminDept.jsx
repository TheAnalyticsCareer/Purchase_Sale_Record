import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../header/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUsers,
  faUserCircle,
  faSyncAlt,
  faEnvelope,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

const AdminDept = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchText, triggerSearch, setTriggerSearch } =
    useContext(SearchContext);

  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");
  const [adminNum, setAdminNum] = useState(0);
  const [purchaseNum, setPurchaseNum] = useState(0);
  const [saleNum, setSaleNum] = useState(0);

  const getAllUsers = async () => {
    try {
      if (!token) {
        alert("You need to login as admin to view the page");
      }

      setIsLoading(true);
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/user/viewUsers/${companyName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAdminNum(
        res?.data?.result.filter((e) => {
          return e.department === "admin";
        }).length
      );

      setPurchaseNum(
        res?.data?.result.filter((e) => {
          return e.department === "purchase";
        }).length
      );
      setSaleNum(
        res?.data?.result.filter((e) => {
          return e.department === "purchase";
        }).length
      );

      setData(res?.data.result);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/user/searchUser/${companyName}/${searchText}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res?.data);
    } catch (err) {
      console.error("Error searching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId, department) => {
    try {
      if (!token) {
        alert("You need to login to perform this action");
        return;
      }

      if (department === "admin") {
        alert("You can't delete the Admin");
        return;
      }

      if (!window.confirm("Are you sure you want to delete this user?")) return;

      await axios.delete(
        `https://purchase-sale-logic.onrender.com/user/deleteUser/${companyName}/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User deleted successfully");
      getAllUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const companyId = () => {
    if (!data || data.length === 0) return null;

    const adminUser = data.find((user) => user.department === "admin");

    return adminUser ? adminUser.company_Id : null;
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (triggerSearch) {
      searchUsers();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  return (
    <div className="admin-dept-container">
      <div className="admin-dept-header">
        <div className="header-content">
          <h1>
            <FontAwesomeIcon icon={faUsers} className="header-icon" />
            User Management
          </h1>
          <div className="company-info">
            <span>
              <FontAwesomeIcon icon={faBuilding} /> {companyName} (ID:{" "}
              {companyId()})
            </span>
          </div>
          <p>Manage and monitor all user accounts in your organization</p>
        </div>
        <div className="admin-dept-stats">
          <div className="stat-card">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{data?.length || 0}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Admin</span>
            <span className="stat-value">{adminNum}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Purchase Managers</span>
            <span className="stat-value">{purchaseNum}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Sales Managers</span>
            <span className="stat-value">{saleNum}</span>
          </div>
        </div>
      </div>

      <div className="admin-dept-controls">
        <button onClick={getAllUsers} className="refresh-btn">
          <FontAwesomeIcon icon={faSyncAlt} />
          Refresh Data
        </button>
      </div>

      <div className="admin-dept-content">
        {isLoading ? (
          <div className="admin-loading-spinner">
            <div className="spinner"></div>
            <p>Loading user data...</p>
          </div>
        ) : data?.length > 0 ? (
          <>
            <div className="admin-table-wrapper">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>User Details</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Company</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, index) => (
                    <tr key={user.user_id}>
                      <td>{index + 1}</td>
                      <td className="admin-user-details">
                        <div className="user-avatar">
                          <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        <div className="user-info">
                          <span className="user-name">{user.fullName}</span>
                          <span className="user-id">ID: {user.user_id}</span>
                        </div>
                      </td>
                      <td className="admin-user-email">
                        <a href={`mailto:${user.email}`}>
                          <FontAwesomeIcon icon={faEnvelope} /> {user.email}
                        </a>
                      </td>
                      <td>
                        <span
                          className={`admin-dept-badge ${user.department.toLowerCase()}`}
                        >
                          {user.department}
                        </span>
                      </td>
                      <td>{user.companyName}</td>
                      <td>
                        {new Date(user.created_at).toLocaleDateString("en-CA")}
                      </td>
                      <td className="admin-actions-cell">
                        <Link
                          to={`/updateUser/${user.user_id}`}
                          className="admin-edit-btn"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteUser(user.user_id, user.department)
                          }
                          className={`admin-delete-btn ${
                            user.department === "admin" ? "disabled" : ""
                          }`}
                          disabled={user.department === "admin"}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-table-footer">
              <div className="pagination-info">
                Showing {data.length} of {data.length} users
              </div>
              <div className="summary-info" >
                <div className="summary-item">
                  <span>Last Updated:</span>
                  <span className="summary-value">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="admin-no-results">
            <div className="no-results-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3>No users found</h3>
            <p>Try adjusting your search or add new users</p>
          </div>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0px;
          padding: 0px;
        }
        .admin-dept-container {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f7fa;
          min-height: 100vh;
          padding: 20px;
          color: #333;
        }

        /* Header Styles */
        .admin-dept-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          padding: 25px 30px;
          border-radius: 10px;
          margin-bottom: 25px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header-content h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .header-icon {
          margin-right: 12px;
          font-size: 24px;
        }

        .company-info {
          margin: 5px 0;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .header-content p {
          margin: 5px 0 0;
          opacity: 0.9;
          font-size: 14px;
        }

        .admin-dept-stats {
          display: flex;
          gap: 20px;
          margin-top: 25px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.15);
          padding: 15px 20px;
          border-radius: 8px;
          min-width: 150px;
          backdrop-filter: blur(5px);
        }

        .stat-label {
          display: block;
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 600;
        }

        /* Controls Section */
        .admin-dept-controls {
          background-color: white;
          border-radius: 10px;
          padding: 15px 20px;
          margin-bottom: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: flex-end;
        }

        .refresh-btn {
          background-color: #6a11cb;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .refresh-btn:hover {
          background-color: #5a0db3;
        }

        /* Table Styles */
        .admin-dept-content {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .admin-table-wrapper {
          overflow-x: auto;
          max-width: 100%;
        }

        .admin-users-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .admin-users-table th {
          text-align: left;
          padding: 12px 15px;
          background-color: #f8f9fa;
          color: #555;
          font-weight: 600;
          border-bottom: 2px solid #eee;
          white-space: nowrap;
        }

        .admin-users-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
          vertical-align: middle;
          // height: 60px;
        }

        .admin-users-table tr:hover {
          background-color: #f8f9fa;
        }

        /* User Details */
        .admin-user-details {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background-color: rgba(106, 17, 203, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6a11cb;
          font-size: 18px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 500;
        }

        .user-id {
          font-size: 12px;
          color: #777;
        }

        .admin-user-email a {
          color: #6c757d;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .admin-user-email a:hover {
          color: #6a11cb;
        }

        /* Department Badges */
        .admin-dept-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .admin-dept-badge.admin {
          background-color: rgba(106, 17, 203, 0.1);
          color: #6a11cb;
        }

        .admin-dept-badge.management {
          background-color: rgba(37, 117, 252, 0.1);
          color: #2575fc;
        }

        .admin-dept-badge.sales {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .admin-dept-badge.operations {
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        .admin-dept-badge.purchase {
          background-color: rgba(184, 220, 53, 0.1);
          color: #ffc107;
        }

        /* Action Buttons */
        .admin-actions-cell {
          white-space: nowrap;
          display: flex;
          gap: 8px;
          
          height:61px;

          }

        .admin-edit-btn,
        .admin-delete-btn {
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .admin-edit-btn {
          background-color: rgba(37, 117, 252, 0.1);
          color: #2575fc;
        }

        .admin-edit-btn:hover {
          background-color: #2575fc;
          color: white;
        }

        .admin-delete-btn {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        .admin-delete-btn:hover:not(.disabled) {
          background-color: #dc3545;
          color: white;
        }

        .admin-delete-btn.disabled {
          background-color: rgba(108, 117, 125, 0.1);
          color: #6c757d;
          cursor: not-allowed;
        }

        /* Table Footer */
        .admin-table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #eee;
          font-size: 13px;
        }

        .pagination-info {
          color: #777;
        }

        .summary-info {
          display: flex;
          gap: 20px;
        }

        .summary-item {
          display: flex;
          gap: 8px;
        }

        .summary-value {
          font-weight: 500;
        }

        /* Loading State */
        .admin-loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #6a11cb;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* No Results State */
        .admin-no-results {
          text-align: center;
          padding: 50px 20px;
        }

        .no-results-icon {
          font-size: 50px;
          color: #ccc;
          margin-bottom: 20px;
        }

        .admin-no-results h3 {
          color: #555;
          margin-bottom: 10px;
        }

        .admin-no-results p {
          color: #888;
          margin: 0;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .admin-dept-stats {
            flex-wrap: wrap;
          }

          .stat-card {
            flex: 1 0 calc(50% - 10px);
            margin-bottom: 10px;
          }

          .admin-table-footer {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDept;

