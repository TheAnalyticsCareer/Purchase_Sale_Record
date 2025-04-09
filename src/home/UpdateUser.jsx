import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logImg from "../components/user/img/log-img.jpg";

const UpdateUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [companyName, user_id, token]);

  const myFormik = useFormik({
    initialValues: data || {
      fullName: "",
      email: "",
      department: "",
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      await toast.promise(
        axios.put(
          `https://purchase-sale-logic.onrender.com/user/updateUser/${companyName}/${user_id}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        {
          pending: "Updating user...",
          success: {
            render({ data }) {
              setTimeout(() => {
                navigate("/admin");
              }, 2000);
              return "User updated successfully!";
            },
          },
          error: {
            render({ data }) {
              const errorMessage = data.response?.data?.message || "An error occurred";
              if (errorMessage === "User not found.") return "User not found.";
              return "Failed to update user. Please try again.";
            },
          },
        }
      );
    },
  });

  return (
    <div className="login-container" style={{
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg" style={{
              borderRadius: "15px",
              overflow: "hidden"
            }}>
              <div className="row g-0">
                {/* Left Side - Image Background */}
                <div className="col-md-6 d-none d-md-flex" style={{
                  position: "relative",
                  minHeight: "600px",
                  padding: "0"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `linear-gradient(rgba(58, 75, 109, 0.7), rgba(30, 43, 77, 0.8)), url(${logImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "40px",
                    textAlign: "center"
                  }}>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <h2 style={{ 
                        fontWeight: "700", 
                        marginBottom: "20px",
                        color: "white",
                        fontSize: "2rem",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                      }}>
                        Update User
                      </h2>
                      <p style={{ 
                        opacity: "0.9", 
                        lineHeight: "1.6",
                        color: "white",
                        fontSize: "1.1rem",
                        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        marginBottom: "30px"
                      }}>
                        Modify user details and permissions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="col-md-6">
                  <div className="p-4 p-md-5" style={{ backgroundColor: "white" }}>
                    <div className="text-center mb-4">
                      <h3 style={{ 
                        fontWeight: "600", 
                        color: "#2c3e50",
                        marginBottom: "5px"
                      }}>
                        User Details
                      </h3>
                      <p className="text-muted small">Update the user information</p>
                    </div>

                    {loading ? (
                      <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading user details...</p>
                      </div>
                    ) : (
                      <form onSubmit={myFormik.handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label small text-muted mb-1">Full Name</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="fullName"
                            onChange={myFormik.handleChange}
                            value={myFormik.values.fullName}
                            placeholder="Full Name"
                            required
                            style={{ borderRadius: "8px", padding: "12px 15px" }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label small text-muted mb-1">Email Address</label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            onChange={myFormik.handleChange}
                            value={myFormik.values.email}
                            placeholder="your@email.com"
                            required
                            style={{ borderRadius: "8px", padding: "12px 15px" }}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label small text-muted mb-1">Department</label>
                          <select
                            className="form-select form-control-lg"
                            name="department"
                            onChange={myFormik.handleChange}
                            value={myFormik.values.department}
                            required
                            style={{ borderRadius: "8px", padding: "12px 15px" }}
                          >
                            <option value="">Select Department</option>
                            <option value="admin">Admin</option>
                            <option value="purchase">Purchase</option>
                            <option value="sales">Sales</option>
                          </select>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                          <button
                            type="button"
                            className="btn btn-lg py-2"
                            onClick={() => navigate("/adminView")}
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#6c757d",
                              color: "white",
                              border: "none",
                              fontWeight: "400",
                              transition: "all 0.3s",
                              width: "48%",
                              height:"40px",
                              fontSize:"16px",
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#5a6268";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#6c757d";
                            }}
                          >
                            <i className="bi bi-arrow-left me-2"></i>
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-primary btn-lg py-2"
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#3a4b6d",
                              border: "none",
                              fontWeight: "400",
                              fontSize:"16px",
                              transition: "all 0.3s",
                              width: "48%"
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#2c3e50";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#3a4b6d";
                            }}
                          >
                            <i className="bi bi-check-circle me-2"></i>
                            Update User
                          </button>
                        </div>
                      </form>
                    )}
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

export default UpdateUser;