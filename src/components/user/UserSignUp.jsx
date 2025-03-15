



import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      department: "",
      companyId: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://purchase-sale-logic.onrender.com/user/signUp",
          values
        );

        myFormik.resetForm();

        // console.log("User SignUp data ---->", res);
        alert("User Signed Up Successfully!");

        navigate("/userLogin");
      } catch (err) {
        console.log("Error message ---", err);

        const errorMessage = err.response?.data?.message || "An error occurred";

        if (errorMessage === "Only admin can Sign Up for the first time.") {
          alert("Company does not exist. You can only Sign Up as an admin.");
        } else if (errorMessage === "Admin already exists.") {
          alert(
            "Admin already exists. You can only sign up for Sales or Purchase department."
          );
        } else if (
          errorMessage === "You can only Sign Up for the Sales or Purchase department."
        ) {
          alert("You can only Sign Up for the Sales or Purchase department.");
        } else if (errorMessage === "Company exists.") {
          alert("Company already exists. Please provide Company ID to Sign Up.");
        } else if (errorMessage === "Company with this ID does not exist.") {
          alert("Please provide the correct Company ID.");
        }
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Sign Up</h2>

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
              type="password"
              className="form-control"
              id="user-password"
              name="password"
              onChange={myFormik.handleChange}
              value={myFormik.values.password}
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="user-company"
              name="companyName"
              onChange={myFormik.handleChange}
              value={myFormik.values.companyName}
              placeholder="Company Name"
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
              placeholder="Your Department (admin / purchase / sales)"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="user-company-id"
              name="companyId"
              onChange={myFormik.handleChange}
              value={myFormik.values.companyId}
              placeholder="Company ID (If company already exists)"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/userLogin" className="text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
