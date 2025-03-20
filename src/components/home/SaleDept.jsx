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
          <div className="mb-3">
            <label className="form-label" htmlFor="sale-Date">
              Sale Date
            </label>
            <input
              type="date"
              name="sale_date"
              id="sale-Date"
              onChange={myFormik.handleChange}
              value={myFormik.values.sale_date}
              className="form-control"
              placeholder="YYYY-MM-DD"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="sale-Type">
              Sale Type
            </label>
            <input
              type="text"
              name="sale_type"
              id="sale-Type"
              onChange={myFormik.handleChange}
              value={myFormik.values.sale_type}
              className="form-control"
              placeholder="Type of Sale"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="sale-Product">
              Sale Product
            </label>
            <input
              type="text"
              name="sale_product"
              id="sale-Product"
              onChange={myFormik.handleChange}
              value={myFormik.values.sale_product}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="sale-Person">
              Sale Person
            </label>
            <input
              type="text"
              name="sale_person"
              id="sale-Person"
              onChange={myFormik.handleChange}
              value={myFormik.values.sale_person}
              className="form-control"
              placeholder="Person Responsible"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="sale-Customer">
              Sale Customer
            </label>
            <input
              type="text"
              name="sale_customer"
              id="sale-Customer"
              onChange={myFormik.handleChange}
              value={myFormik.values.sale_customer}
              className="form-control"
              placeholder="Customer Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="sale-Amount">
              Sale Amount
            </label>
            <input
              type="text"
              name="sale_amount"
              id="sale-Amount"
              onChange={myFormik.handleChange}
              value={myFormik.values.sale_amount}
              className="form-control"
              placeholder="Enter Amount"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="sale-Commission">
              Sale Commission
            </label>
            <input
              type="text"
              name="sale_commission"
              id="sale-Commission"
              onChange={myFormik.handleChange}
              value={myFormik.values.sale_commission}
              className="form-control"
              placeholder="Commission Amount"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="payment-Type">
              Payment Type
            </label>
          

            <select
              name="payment_type"
              id="payment-Type"
              className="form-control"
              value={myFormik.values.payment_type}
              onChange={myFormik.handleChange}
              required
            >
              <option value="">Select Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="payment-Condition">
              Payment Condition
            </label>
            <input
              type="text"
              name="payment_condition"
              id="payment-Condition"
              onChange={myFormik.handleChange}
              value={myFormik.values.payment_condition}
              className="form-control"
              placeholder="Payment Terms"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="payment-Date">
              Payment Date
            </label>
            <input
              type="date"
              name="payment_date"
              id="payment-Date"
              onChange={myFormik.handleChange}
              value={myFormik.values.payment_date}
              className="form-control"
              placeholder="YYYY-MM-DD"
              required
            />
          </div>

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
