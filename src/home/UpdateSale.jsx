import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateSale = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName");
  const { sale_id } = useParams();

  const getUniqueSale = async () => {
    try {
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/sales/getUniqueSale/${companyName}/${sale_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (Array.isArray(res?.data?.result) && res?.data?.result.length > 0) {
        let fetchedData = res.data.result[0];

        if (fetchedData.sale_date) {
          fetchedData.sale_date = fetchedData.sale_date.split("T")[0];
        }
        if (fetchedData.payment_date) {
          fetchedData.payment_date = fetchedData.payment_date.split("T")[0];
        }

        setData(fetchedData);
      }
    } catch (err) {
      console.log("Error fetching sale history:", err);
    }
  };

  useEffect(() => {
    getUniqueSale();
  }, []);

  const myFormik = useFormik({
    initialValues: data || {
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
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        if (!token) {
          alert("You need to be logged in to update sale entries.");
          return;
        }

        await axios.put(
          `https://purchase-sale-logic.onrender.com/sales/updateSalesRecord/${companyName}/${sale_id}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Entry updated successfully");
        navigate("/viewSalesHistory");
      } catch (err) {
        console.log("Error updating sales:", err);
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light my-5">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Update Sale Entry</h2>
        <form onSubmit={myFormik.handleSubmit}>
          {[  
            { name: "sale_date", type: "date", label: "Sale Date" },
            { name: "sale_type", type: "text", label: "Sale Type", placeholder: "Type of Sale" },
            { name: "sale_product", type: "text", label: "Sale Product", placeholder: "Product Name" },
            { name: "sale_person", type: "text", label: "Sale Person", placeholder: "Person Responsible" },
            { name: "sale_customer", type: "text", label: "Sale Customer", placeholder: "Customer Name" },
            { name: "sale_amount", type: "number", label: "Sale Amount", placeholder: "Enter Amount" },
            { name: "sale_commission", type: "number", label: "Sale Commission", placeholder: "Commission Amount" },
            { name: "payment_type", type: "text", label: "Payment Type", placeholder: "Cash / Credit" },
            { name: "payment_condition", type: "text", label: "Payment Condition", placeholder: "Payment Terms" },
            { name: "payment_date", type: "date", label: "Payment Date" },
          ].map((field) => (
            <div className="mb-3" key={field.name}>
              <label className="form-label" htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={myFormik.handleChange}
                value={myFormik.values[field.name]}
                className="form-control"
                placeholder={field.placeholder || ""}
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

export default UpdateSale;
