import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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
        `https://purchase-sale-logic.onrender.com/user//getUser/${companyName}/${user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("res.data.result for unique user----", res.data.result);

      setData(res?.data.result[0]);
    } catch (err) {
      console.log("err--", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Formik for form handling
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
          `https://purchase-sale-logic.onrender.com/user//updateUser/${companyName}/${user_id}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("User updated successfully");
        navigate("/admin");
      } catch (err) {
        console.error("Error updating User:", err);
      }
    },
  });

  return (
    <>
      <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
          <div>
            <input
              type="text"
              id="full-name"
              name="fullName"
              onChange={myFormik.handleChange}
              value={myFormik.values.fullName}
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <input
              type="email"
              id="user-email"
              name="email"
              onChange={myFormik.handleChange}
              value={myFormik.values.email}
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="user-department"
              name="department"
              onChange={myFormik.handleChange}
              value={myFormik.values.department}
              placeholder="Your Department admin/purchase/sales"
              required
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
