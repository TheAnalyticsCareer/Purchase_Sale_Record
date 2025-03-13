import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SaleDept = () => {
  const myFormik = useFormik({
    initialValues: {
      sale_date: "",
      sale_type: "",
      sale_product: "",
      sale_person: "",
      sale_customer: "",
      sale_amount: "",
      sale_commission: "",
      payment_type: "",
      payment_condition: "",
      payment_date: "",
    },

    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const companyName = localStorage.getItem("companyName");

        if (!token) {
          alert("You need to be logged in to submit sale entries.");
          return;
        }

        await axios.post(
          `https://purchase-sale-logic.onrender.com/sales/salesEntry/${companyName}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        myFormik.resetForm();
        alert("Entry submitted successfully!");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light my-5">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Sale Entry Form</h2>
        <form onSubmit={myFormik.handleSubmit}>
          {[
            { name: "sale_date", type: "text", label: "Sale Date", placeholder: "YYYY-MM-DD" },
            { name: "sale_type", type: "text", label: "Sale Type", placeholder: "Type of Sale" },
            { name: "sale_product", type: "text", label: "Sale Product", placeholder: "Product Name" },
            { name: "sale_person", type: "text", label: "Sale Person", placeholder: "Person Responsible" },
            { name: "sale_customer", type: "text", label: "Sale Customer", placeholder: "Customer Name" },
            { name: "sale_amount", type: "text", label: "Sale Amount", placeholder: "Enter Amount" },
            { name: "sale_commission", type: "text", label: "Sale Commission", placeholder: "Commission Amount" },
            { name: "payment_type", type: "text", label: "Payment Type", placeholder: "Cash / Credit" },
            { name: "payment_condition", type: "text", label: "Payment Condition", placeholder: "Payment Terms" },
            { name: "payment_date", type: "text", label: "Payment Date", placeholder: "YYYY-MM-DD" },
          ].map((field) => (
            <div className="mb-3" key={field.name}>
              <label className="form-label" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={myFormik.handleChange}
                value={myFormik.values[field.name]}
                className="form-control"
                placeholder={field.placeholder}
                required
                style={{ appearance: "none" }}
              />
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleDept;
