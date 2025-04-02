// import React from "react";
// import axios from "axios";
// import { useFormik } from "formik";
// import { useNavigate, Link } from "react-router-dom";

// const UserLogin = () => {
//   const navigate = useNavigate();

//   const myFormik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       companyName: "",
//     },

//     onSubmit: async (values) => {
//       try {
//         const res = await axios.post(
//           `https://purchase-sale-logic.onrender.com/user/userLogin`,
//           values
//         );

//         myFormik.resetForm();

//         // console.log("User login response:", res);

//         // ---- Saving token and user info in local storage ----
//         const token = res.data.token;
//         const userId = res.data.user.user_id;
//         const companyName = res.data.user.companyName;
//         let department = res.data.user.department.toLowerCase();
//         const email = res.data.user.email;

//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", userId);
//         localStorage.setItem("companyName", companyName);
//         localStorage.setItem("department", department);
//         localStorage.setItem("email", email);

//         alert("User Logged In Successfully!");
//         navigate(`/${department}`);
//         window.location.reload();

//       } catch (err) {
//         console.log("Error:", err);

//         const errorMessage = err.response?.data?.message || "An error occurred";

//         if (errorMessage === "User not found.") {
//           alert("User not found. Please try a different Email.");
//         } else if (errorMessage === "Invalid Password") {
//           alert("Invalid Password. Please try again.");
//         }
//       }
//     },
//   });

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
//         <h2 className="text-center mb-3">Login</h2>

//         <form onSubmit={myFormik.handleSubmit}>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               id="user-email"
//               name="email"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.email}
//               placeholder="Email"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control"
//               id="user-password"
//               name="password"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.password}
//               placeholder="Password"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               id="user-company"
//               name="companyName"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.companyName}
//               placeholder="Company Name"
//               required
//             />
//           </div>

//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </div>
//         </form>

//         <div className="text-center mt-3">
//           Don't have an account?{" "}
//           <Link to="/userSignUp" className="text-primary">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;










import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logImg from "../user/img/log-img.jpg";

const UserLogin = () => {
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      companyName: "",
    },

    onSubmit: async (values) => {
      await toast.promise(
        axios.post(`https://purchase-sale-logic.onrender.com/user/userLogin`, values).then((res) => {
          // Store user data
          const token = res.data.token;
          const userId = res.data.user.user_id;
          const companyName = res.data.user.companyName;
          let department = res.data.user.department.toLowerCase();
          const email = res.data.user.email;
    
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("companyName", companyName);
          localStorage.setItem("department", department);
          localStorage.setItem("email", email);
    
          myFormik.resetForm();
    
          return res;
        }),
        {
          pending: "Logging in...",
          success: {
            render({ data }) {
              const department = data.data.user.department.toLowerCase();
    
              // Navigate after a short delay
              setTimeout(() => {
                navigate(`/${department}`);
                window.location.reload();
              }, 3000);
    
              return "Login Successful!";
            },
          },
          error: {
            render({ data }) {
              const errorMessage = data.response?.data?.message || "An error occurred";
              if (errorMessage === "User not found.") return "User not found. Try again with different email.";
              if (errorMessage === "Invalid Password") return "Invalid password. Try again.";
              return "An error occurred. Please try again.";
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
                  {/* Image with Dark Overlay */}
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
                        Welcome Back
                      </h2>
                      <p style={{ 
                        opacity: "0.9", 
                        lineHeight: "1.6",
                        color: "white",
                        fontSize: "1.1rem",
                        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        marginBottom: "30px"
                      }}>
                        Log in to access your account and manage your business operations.
                      </p>
                      {/* Optional: Add your logo or icon here */}
                    </div>
                  </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="col-md-6">
                  <div className="p-4 p-md-5" style={{ backgroundColor: "white" }}>
                    <div className="text-center mb-4">
                      <h3 style={{ 
                        fontWeight: "600", 
                        color: "#2c3e50",
                        marginBottom: "5px"
                      }}>
                        Account Login
                      </h3>
                      <p className="text-muted small">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={myFormik.handleSubmit}>
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

                      <div className="mb-3">
                        <label className="form-label small text-muted mb-1">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          name="password"
                          onChange={myFormik.handleChange}
                          value={myFormik.values.password}
                          placeholder="••••••••"
                          required
                          style={{ borderRadius: "8px", padding: "12px 15px" }}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label small text-muted mb-1">Company Name</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="companyName"
                          onChange={myFormik.handleChange}
                          value={myFormik.values.companyName}
                          placeholder="Your Company"
                          required
                          style={{ borderRadius: "8px", padding: "12px 15px" }}
                        />
                      </div>

                      <div className="d-grid mb-3">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg py-2"
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#3a4b6d",
                            border: "none",
                            fontWeight: "500",
                            transition: "all 0.3s"
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#2c3e50";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#3a4b6d";
                          }}
                        >
                          Login
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <p className="text-muted small mb-0">
                          Don't have an account?{" "}
                          <Link 
                            to="/userSignUp" 
                            style={{
                              color: "#3a4b6d",
                              fontWeight: "500",
                              textDecoration: "none"
                            }}
                          >
                            Sign Up
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

export default UserLogin;