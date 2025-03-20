
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PurchaseDept = () => {
  const myFormik = useFormik({
    initialValues: {
      purchase_date: "",
      purchase_type: "",
      purchase_product: "",
      purchase_person: "",
      purchase_supplier: "",
      purchase_amount: "",
      purchase_commission: "",
      payment_type: "",
      payment_condition: "",
      payment_date: "",
    },

    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const companyName = localStorage.getItem("companyName");

        if (!token) {
          alert("You need to be logged in to submit purchase entries.");
          return;
        }

        await axios.post(
          `https://purchase-sale-logic.onrender.com/purchase/purchaseEntry/${companyName}`,
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
        <h2 className="text-center mb-4">Purchase Entry Form</h2>

        <form onSubmit={myFormik.handleSubmit}>
        
          <div className="mb-3">
            <label className="form-label" htmlFor="purchase_date">Purchase Date</label>
            <input
              type="date"
              name="purchase_date"
              id="purchase_date"
              className="form-control"
              value={myFormik.values.purchase_date}
              onChange={myFormik.handleChange}
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="purchase_type">Purchase Type</label>
            <input
              type="text"
              name="purchase_type"
              id="purchase_type"
              className="form-control"
              value={myFormik.values.purchase_type}
              onChange={myFormik.handleChange}
              placeholder="Type of Purchase"
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="purchase_product">Purchase Product</label>
            <input
              type="text"
              name="purchase_product"
              id="purchase_product"
              className="form-control"
              value={myFormik.values.purchase_product}
              onChange={myFormik.handleChange}
              placeholder="Product Name"
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="purchase_person">Purchase Person</label>
            <input
              type="text"
              name="purchase_person"
              id="purchase_person"
              className="form-control"
              value={myFormik.values.purchase_person}
              onChange={myFormik.handleChange}
              placeholder="Person Responsible"
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="purchase_supplier">Purchase Supplier</label>
            <input
              type="text"
              name="purchase_supplier"
              id="purchase_supplier"
              className="form-control"
              value={myFormik.values.purchase_supplier}
              onChange={myFormik.handleChange}
              placeholder="Supplier Name"
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="purchase_amount">Purchase Amount</label>
            <input
              type="number"
              name="purchase_amount"
              id="purchase_amount"
              className="form-control"
              value={myFormik.values.purchase_amount}
              onChange={myFormik.handleChange}
              placeholder="Enter Amount"
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="purchase_commission">Purchase Commission</label>
            <input
              type="number"
              name="purchase_commission"
              id="purchase_commission"
              className="form-control"
              value={myFormik.values.purchase_commission}
              onChange={myFormik.handleChange}
              placeholder="Commission Amount"
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="payment_type">Payment Type</label>
            <select
              name="payment_type"
              id="payment_type"
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
            <label className="form-label" htmlFor="payment_condition">Payment Condition</label>
            <input
              type="text"
              name="payment_condition"
              id="payment_condition"
              className="form-control"
              value={myFormik.values.payment_condition}
              onChange={myFormik.handleChange}
              placeholder="Payment Terms"
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label" htmlFor="payment_date">Payment Date</label>
            <input
              type="date"
              name="payment_date"
              id="payment_date"
              className="form-control"
              value={myFormik.values.payment_date}
              onChange={myFormik.handleChange}
              required
            />
          </div>

         
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseDept;
