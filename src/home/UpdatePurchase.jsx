// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useFormik } from "formik";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdatePurchase = () => {
//   const [data, setData] = useState(null);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const companyName = localStorage.getItem("companyName");
//   const { purchase_id } = useParams();

//   // Fetch the unique purchase details
//   const getUniquePurchase = async () => {
//     try {
//       const res = await axios.get(
//         `https://purchase-sale-logic.onrender.com/purchase/getUniquePurchase/${companyName}/${purchase_id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Purchase Data for update:", res?.data?.result);

//       if (Array.isArray(res?.data?.result) && res?.data?.result.length > 0) {
//         let fetchedData = res.data.result[0];

//         if (fetchedData.purchase_date) {
//           fetchedData.purchase_date = fetchedData.purchase_date.split("T")[0];
//         }
//         if (fetchedData.payment_date) {
//           fetchedData.payment_date = fetchedData.payment_date.split("T")[0];
//         }

//         setData(fetchedData);
//       }
//     } catch (err) {
//       console.error("Error fetching purchase history:", err);
//     }
//   };

//   useEffect(() => {
//     getUniquePurchase();
//   }, []);

//   // Formik for form handling
//   const myFormik = useFormik({
//     initialValues: data || {
//       purchase_date: "",
//       purchase_type: "",
//       purchase_product: "",
//       purchase_person: "",
//       purchase_supplier: "",
//       purchase_amount: "",
//       purchase_commission: "",
//       payment_type: "",
//       payment_condition: "",
//       payment_date: "",
//     },
//     enableReinitialize: true,

//     onSubmit: async (values) => {
//       try {
//         if (!token) {
//           alert("You need to be logged in to submit purchase entries.");
//           return;
//         }

//         await axios.put(
//           `https://purchase-sale-logic.onrender.com/purchase/updatePurchaseRecord/${companyName}/${purchase_id}`,
//           values,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         alert("Entry updated successfully");
//         navigate("/viewPurchaseHistory");
//       } catch (err) {
//         console.error("Error updating purchase:", err);
//       }
//     },
//   });

//   return (
//     <div className="container">
//       <form onSubmit={myFormik.handleSubmit}>
//         <div>
//           <input
//             type="date"
//             name="purchase_date"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.purchase_date}
//             placeholder="Purchase Date"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="purchase_type"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.purchase_type}
//             placeholder="Purchase Type"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="purchase_product"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.purchase_product}
//             placeholder="Purchase Product"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="purchase_person"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.purchase_person}
//             placeholder="Purchase Person"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="purchase_supplier"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.purchase_supplier}
//             placeholder="Purchase Supplier"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="number"
//             name="purchase_amount"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.purchase_amount}
//             placeholder="Purchase Amount"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="number"
//             name="purchase_commission"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.purchase_commission}
//             placeholder="Purchase Commission"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="payment_type"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.payment_type}
//             placeholder="Payment Type"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="payment_condition"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.payment_condition}
//             placeholder="Payment Condition"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="date"
//             name="payment_date"
//             onChange={myFormik.handleChange}
//             value={myFormik.values.payment_date}
//             placeholder="Payment Date"
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdatePurchase;



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
        console.error("Error fetching purchase history:", err);
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
        console.error("Error updating purchase:", err);
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
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
