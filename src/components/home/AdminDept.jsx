import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../header/SearchContext";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDept = () => {
  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");
  const { searchText, triggerSearch, setTriggerSearch } = useContext(SearchContext);
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`https://purchase-sale-logic.onrender.com/user/viewUsers/${companyName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res?.data.result);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const search = async () => {
    try {
      const res = await axios.get(`https://purchase-sale-logic.onrender.com/user/searchUser/${companyName}/${searchText}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res?.data);
    } catch (err) {
      console.error("Error searching users:", err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      if (!token) {
        alert("You need to login to perform this action");
        return;
      }
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      await axios.delete(`https://purchase-sale-logic.onrender.com/user/deleteUser/${companyName}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully");
      getAllUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (triggerSearch) {
      search();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  return (
    <div className="container my-4">
      {data?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered shadow-lg">
            <thead className="table-dark text-center">
              <tr>
                <th>User Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Company</th>
                <th>Company Id</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.user_id} className="align-middle text-center">
                  <td>{user.user_id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>{user.companyName}</td>
                  <td>{user.company_Id}</td>
                  <td>{new Date(user.created_at).toLocaleDateString("en-CA")}</td>
                  <td>
                    <Link to={`/updateUser/${user.user_id}`} className="me-2">
                      <button className="btn btn-success btn-sm">Update</button>
                    </Link>
                    <button onClick={() => deleteUser(user.user_id)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No Users Found</p>
      )}
    </div>
  );
};

export default AdminDept;
