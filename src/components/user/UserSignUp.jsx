import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import signImg from "../user/img/sign-img.jpg";

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
      await toast.promise(
        axios
          .post("https://purchase-sale-logic.onrender.com/user/signUp", values)
          .then((response) => {
            myFormik.resetForm();
            setTimeout(() => navigate("/userLogin"), 3500);
            return response;
          }),
        {
          pending: "Signing up...",
          success: "Sign Up Successful!",
          error: {
            render({ data }) {
              const errorMessage =
                data?.response?.data?.message || "Signup failed. Please try again.";
    
              if (errorMessage === "Only admin can Sign Up for the first time.") {
                return "Company does not exist. Sign Up as an admin first.";
              } 
              if (errorMessage === "Admin already exists.") {
                return "Admin exists. Sign up for Sales/Purchase only.";
              } 
              if (errorMessage.includes("Sales or Purchase department")) {
                return "You can only sign up for Sales/Purchase.";
              } 
              if (errorMessage === "Company exists.") {
                return "Company already exists. Provide a Company ID.";
              } 
              if (errorMessage === "Company with this ID does not exist.") {
                return "Invalid Company ID. Please check.";
              } 
              
              return errorMessage;
            },
          },
        }
      );
    },
  });

  return (
    <div className="signup-container" style={{
      background: "#f8f9fa",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12">
            <div className="card border-0 shadow" style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "none"
            }}>
              <div className="row g-0">
                {/* Left Side - Image Background */}
                <div className="col-lg-6 d-none d-lg-flex" style={{
                  position: "relative",
                  minHeight: "600px",
                  backgroundImage: `url(${signImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "40px"
                }}>
                  {/* Dark overlay for better text visibility */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)"
                  }}></div>
                  
                  {/* Content */}
                  <div style={{
                    position: "relative",
                    zIndex: 1,
                    color: "white",
                    textAlign: "center"
                  }}>
                    <h2 style={{ 
                      fontWeight: "700", 
                      marginBottom: "20px",
                      fontSize: "2rem",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                    }}>
                      Welcome to Our Platform
                    </h2>
                    <p style={{ 
                      opacity: "0.9", 
                      lineHeight: "1.6",
                      fontSize: "1.1rem",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                    }}>
                      Create your account and get started in minutes.
                    </p>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="col-lg-6">
                  <div className="p-4 p-md-5" style={{ backgroundColor: "white" }}>
                    <div className="text-center mb-4">
                      <h3 style={{ 
                        fontWeight: "600", 
                        color: "#2c3e50",
                        marginBottom: "5px"
                      }}>
                        Create Account
                      </h3>
                      <p className="text-muted small">
                        Fill in your details to get started
                      </p>
                    </div>

                    <form onSubmit={myFormik.handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label small text-muted mb-1">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            onChange={myFormik.handleChange}
                            value={myFormik.values.fullName}
                            placeholder="John Doe"
                            required
                            style={{ borderRadius: "6px", padding: "10px 15px" }}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label small text-muted mb-1">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={myFormik.handleChange}
                            value={myFormik.values.email}
                            placeholder="john@example.com"
                            required
                            style={{ borderRadius: "6px", padding: "10px 15px" }}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label small text-muted mb-1">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={myFormik.handleChange}
                          value={myFormik.values.password}
                          placeholder="••••••••"
                          required
                          style={{ borderRadius: "6px", padding: "10px 15px" }}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-8 mb-3">
                          <label className="form-label small text-muted mb-1">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            onChange={myFormik.handleChange}
                            value={myFormik.values.companyName}
                            placeholder="Acme Inc."
                            required
                            style={{ borderRadius: "6px", padding: "10px 15px" }}
                          />
                        </div>

                        <div className="col-md-4 mb-3">
                          <label className="form-label small text-muted mb-1">Company ID</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyId"
                            onChange={myFormik.handleChange}
                            value={myFormik.values.companyId}
                            placeholder="Optional"
                            style={{ borderRadius: "6px", padding: "10px 15px" }}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label small text-muted mb-1">Department</label>
                        <select
                          className="form-select"
                          name="department"
                          onChange={myFormik.handleChange}
                          value={myFormik.values.department}
                          required
                          style={{ borderRadius: "6px", padding: "10px 15px" }}
                        >
                          <option value="">Select Department</option>
                          <option value="admin">Admin</option>
                          <option value="purchase">Purchase</option>
                          <option value="sales">Sales</option>
                        </select>
                      </div>

                      <div className="d-grid mb-3">
                        <button 
                          type="submit" 
                          className="btn btn-primary py-2"
                          style={{
                            borderRadius: "6px",
                            backgroundColor: "#3a4b6d",
                            border: "none",
                            fontWeight: "500",
                            transition: "all 0.3s",
                            height: "45px"
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#2c3e50";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#3a4b6d";
                          }}
                        >
                          Create Account
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <p className="text-muted small mb-0">
                          Already have an account?{" "}
                          <Link 
                            to="/userLogin" 
                            style={{
                              color: "#3a4b6d",
                              fontWeight: "500",
                              textDecoration: "none"
                            }}
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default UserSignUp;