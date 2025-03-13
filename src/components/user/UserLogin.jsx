// import React from 'react'
// import axios from 'axios'
// import { useFormik } from 'formik'
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'


// const UserLogin = () => {


//     const navigate=useNavigate()

//     const myFormik=useFormik({
//         initialValues:{
//             email:"",
//             password:"",
//             companyName:""
//         },

//         onSubmit:async(values)=>{
//             try{
//                 const res=await axios.post(`http://localhost:5000/user//userLogin`,values);

//                 myFormik.resetForm();

//                 console.log("data of user trying to login---->",res);
              
//                 // ----saving token and userId-----------------------
//                 const token = res.data.token; 
//                 const userId = res.data.user.user_id;
//                 const companyName=res.data.user.companyName;
//                 let department=res.data.user.department;
//                 department=department.toLowerCase();
//                 const email=res.data.user.email;
        
//                 localStorage.setItem("token", token); 
//                 localStorage.setItem("userId", userId);
//                 localStorage.setItem("companyName",companyName);
//                 localStorage.setItem("department",department);
//                 localStorage.setItem("email",email)
        
//                 alert("User Login Successfully!");
                
//                 navigate(`/${department}`); 
//                 window.location.reload();

//                 console.log("userid--------", userId);
//                 console.log("token-----", token);
//                 console.log("companyName---",companyName)
//                 console.log("department---",department)
//                 console.log("email---",email)
        

//             }catch(err){
//                 console.log("message---",err);

//                 console.log("err.response.data.message--->",err.response.data.message);

//                 if(err.response.data.message==="User not found."){
//                     alert("User not found.Please try different Email Id.")
//                 }else if(err.response.data.message==="Invalid Password"){
//                     alert("Invaild Password")
//                 }
//             }
//         }
//     })

//   return (
//     <>
      

//       <div className="container">
//        <form onSubmit={myFormik.handleSubmit}>

       

//         <div>
//             <input type="email"  id='user-email' name='email' onChange={myFormik.handleChange} value={myFormik.values.email} placeholder='Email' required/>
//         </div>

//         <div>
//             <input type="password"  id="user-password" name="password" onChange={myFormik.handleChange} value={myFormik.values.password} placeholder='Password' required />
//         </div>

//         <div>
//             <input type="text" id='user-company' name='companyName' onChange={myFormik.handleChange} value={myFormik.values.companyName} placeholder='Company Name' required />
//         </div>


//         <div>
//             <button type='submit'>Login</button>
//         </div>

//        </form>
//     </div>

//     <div><Link to={"/userSignUp"}>SignUp</Link> </div>


//     </>
//   )
// }

// export default UserLogin



import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      companyName: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/user/userLogin`,
          values
        );

        myFormik.resetForm();

        console.log("User login response:", res);

        // ---- Saving token and user info in local storage ----
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

        alert("User Logged In Successfully!");
        navigate(`/${department}`);
        window.location.reload();

      } catch (err) {
        console.log("Error:", err);

        const errorMessage = err.response?.data?.message || "An error occurred";

        if (errorMessage === "User not found.") {
          alert("User not found. Please try a different Email.");
        } else if (errorMessage === "Invalid Password") {
          alert("Invalid Password. Please try again.");
        }
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Login</h2>

        <form onSubmit={myFormik.handleSubmit}>
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

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/userSignUp" className="text-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
