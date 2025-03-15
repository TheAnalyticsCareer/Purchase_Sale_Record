import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdatePurchase = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName");
  const { purchase_id } = useParams();

  useEffect(() => {
    const getUniquePurchase = async () => {
      try {
        const res = await axios.get(
          `https://purchase-sale-logic.onrender.com/purchase/getUniquePurchase/${companyName}/${purchase_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (Array.isArray(res?.data?.result) && res?.data?.result.length > 0) {
          let fetchedData = res.data.result[0];
          fetchedData.purchase_date = fetchedData.purchase_date?.split("T")[0] || "";
          fetchedData.payment_date = fetchedData.payment_date?.split("T")[0] || "";
          setData(fetchedData);
        }
      } catch (err) {
        console.log("Error fetching purchase history:", err);
      }
    };
    getUniquePurchase();
  }, [companyName, purchase_id, token]);

  const myFormik = useFormik({
    initialValues: data || {
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
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (!token) {
          alert("You need to be logged in to update purchase entries.");
          return;
        }

        await axios.put(
          `https://purchase-sale-logic.onrender.com/purchase/updatePurchaseRecord/${companyName}/${purchase_id}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Entry updated successfully");
        navigate("/viewPurchaseHistory");
      } catch (err) {
        console.log("Error updating purchase:", err);
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light my-5">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Update Purchase Entry</h2>
        <form onSubmit={myFormik.handleSubmit}>
          {["purchase_date", "purchase_type", "purchase_product", "purchase_person", "purchase_supplier", "purchase_amount", "purchase_commission", "payment_type", "payment_condition", "payment_date"].map((field, index) => (
            <div className="mb-3" key={index}>
              <label className="form-label" htmlFor={field}>
                {field.replace("_", " ").replace("purchase", "Purchase").replace("payment", "Payment").replace("date", "Date").replace("type", "Type").replace("condition", "Condition").replace("product", "Product").replace("person", "Person").replace("supplier", "Supplier").replace("amount", "Amount").replace("commission", "Commission").replace("type", "Type").replace("condition", "Condition").replace("date", "Date")}
              </label>
              <input
                type={field.includes("date") ? "date" : field.includes("amount") || field.includes("commission") ? "number" : "text"}
                name={field}
                id={field}
                onChange={myFormik.handleChange}
                value={myFormik.values[field]}
                className="form-control"
                required
              />
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-100">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePurchase;
