


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName");
  const { user_id } = useParams();

  const getUser = async () => {
    try {
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/user/getUser/${companyName}/${user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res?.data.result[0]);
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const myFormik = useFormik({
    initialValues: data || {
      fullName: "",
      email: "",
      department: "",
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        if (!token) {
          alert("You need to be logged in to update user.");
          return;
        }

        await axios.put(
          `https://purchase-sale-logic.onrender.com/user/updateUser/${companyName}/${user_id}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("User updated successfully");
        navigate("/admin");
      } catch (err) {
        console.log("Error updating User:", err);
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Update User</h2>
        <form onSubmit={myFormik.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="full-name"
              name="fullName"
              onChange={myFormik.handleChange}
              value={myFormik.values.fullName}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="user-email"
              name="email"
              onChange={myFormik.handleChange}
              value={myFormik.values.email}
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="user-department"
              name="department"
              onChange={myFormik.handleChange}
              value={myFormik.values.department}
              placeholder="Your Department (admin/purchase/sales)"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
