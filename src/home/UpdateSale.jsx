import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSale = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName");
  const { sale_id } = useParams();

  // Fetch the unique sale details
  const getUniqueSale = async () => {
    try {
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/sales/getUniqueSale/${companyName}/${sale_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      console.log("Sale Data for update:", res?.data?.result);
      
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
      console.error("Error fetching sale history:", err);
    }
  };
  
  useEffect(() => {
    getUniqueSale();
  }, []);

  // Formik for form handling
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
          alert("You need to be logged in to submit sale entries.");
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
        console.error("Error updating sales:", err);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={myFormik.handleSubmit}>
        <div>
          <input
            type="date"
            name="sale_date"
            onChange={myFormik.handleChange}
            value={myFormik.values.sale_date}
            placeholder="Sale Date"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="sale_type"
            onChange={myFormik.handleChange}
            value={myFormik.values.sale_type}
            placeholder="Sale Type"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="sale_product"
            onChange={myFormik.handleChange}
            value={myFormik.values.sale_product}
            placeholder="Sale Product"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="sale_person"
            onChange={myFormik.handleChange}
            value={myFormik.values.sale_person}
            placeholder="Sale Person"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="sale_customer"
            onChange={myFormik.handleChange}
            value={myFormik.values.sale_customer}
            placeholder="Sale Customer"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="sale_amount"
            onChange={myFormik.handleChange}
            value={myFormik.values.sale_amount}
            placeholder="Sale Amount"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="sale_commission"
            onChange={myFormik.handleChange}
            value={myFormik.values.sale_commission}
            placeholder="Sale Commission"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="payment_type"
            onChange={myFormik.handleChange}
            value={myFormik.values.payment_type}
            placeholder="Payment Type"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="payment_condition"
            onChange={myFormik.handleChange}
            value={myFormik.values.payment_condition}
            placeholder="Payment Condition"
            required
          />
        </div>
        <div>
          <input
            type="date"
            name="payment_date"
            onChange={myFormik.handleChange}
            value={myFormik.values.payment_date}
            placeholder="Payment Date"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSale;
