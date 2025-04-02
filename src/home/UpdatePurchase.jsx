// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useFormik } from "formik";
// import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const UpdatePurchase = () => {
//   const [data, setData] = useState(null);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const companyName = localStorage.getItem("companyName");
//   const { purchase_id } = useParams();

//   useEffect(() => {
//     const getUniquePurchase = async () => {
//       try {
//         const res = await axios.get(
//           `https://purchase-sale-logic.onrender.com/purchase/getUniquePurchase/${companyName}/${purchase_id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
        
//         if (Array.isArray(res?.data?.result) && res?.data?.result.length > 0) {
//           let fetchedData = res.data.result[0];
//           fetchedData.purchase_date = fetchedData.purchase_date?.split("T")[0] || "";
//           fetchedData.payment_date = fetchedData.payment_date?.split("T")[0] || "";
//           setData(fetchedData);
//         }
//       } catch (err) {
//         console.log("Error fetching purchase history:", err);
//       }
//     };
//     getUniquePurchase();
//   }, [companyName, purchase_id, token]);

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
//           alert("You need to be logged in to update purchase entries.");
//           return;
//         }

//         await axios.put(
//           `https://purchase-sale-logic.onrender.com/purchase/updatePurchaseRecord/${companyName}/${purchase_id}`,
//           values,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         alert("Entry updated successfully");
//         navigate("/viewPurchaseHistory");
//       } catch (err) {
//         console.log("Error updating purchase:", err);
//       }
//     },
//   });

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light my-5">
//       <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
//         <h2 className="text-center mb-4">Update Purchase Entry</h2>
//         <form onSubmit={myFormik.handleSubmit}>
//           {["purchase_date", "purchase_type", "purchase_product", "purchase_person", "purchase_supplier", "purchase_amount", "purchase_commission", "payment_type", "payment_condition", "payment_date"].map((field, index) => (
//             <div className="mb-3" key={index}>
//               <label className="form-label" htmlFor={field}>
//                 {field.replace("_", " ").replace("purchase", "Purchase").replace("payment", "Payment").replace("date", "Date").replace("type", "Type").replace("condition", "Condition").replace("product", "Product").replace("person", "Person").replace("supplier", "Supplier").replace("amount", "Amount").replace("commission", "Commission").replace("type", "Type").replace("condition", "Condition").replace("date", "Date")}
//               </label>
//               <input
//                 type={field.includes("date") ? "date" : field.includes("amount") || field.includes("commission") ? "number" : "text"}
//                 name={field}
//                 id={field}
//                 onChange={myFormik.handleChange}
//                 value={myFormik.values[field]}
//                 className="form-control"
//                 required
//               />
//             </div>
//           ))}
//           <div className="d-flex justify-content-center">
//             <button type="submit" className="btn btn-primary w-100">Update</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdatePurchase;












import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Failed to fetch purchase details");
      }
    };
    getUniquePurchase();
  }, []);

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
          toast.warn("You need to be logged in to update purchase entries.");
          return;
        }

        await axios.put(
          `https://purchase-sale-logic.onrender.com/purchase/updatePurchaseRecord/${companyName}/${purchase_id}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Purchase entry updated successfully!");
        setTimeout(() => {
          navigate("/viewPurchaseHistory");
        }, 1500);
      } catch (err) {
        console.log("Error updating purchase:", err);
        toast.error("Failed to update purchase entry. Please try again.");
      }
    },
  });

  return (
    <div className="container-fluid" style={{ backgroundColor: '#F1F5FC', minHeight: '100vh', padding: '2rem' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <div className="card-header" style={{ 
              backgroundColor: '#795FCD', 
              color: '#FFFFFF',
              padding: '1.25rem 1.5rem',
              borderRadius: '12px 12px 0 0'
            }}>
              <h2 className="h5 mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                Update Purchase Entry
              </h2>
              <p className="mb-0 mt-1" style={{ opacity: 0.9 }}>
                Modify the details of your purchase transaction
              </p>
            </div>

            <div className="card-body" style={{ padding: '1.5rem' }}>
              {data ? (
                <form onSubmit={myFormik.handleSubmit}>
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="purchase_date" className="form-label fw-medium">
                          Purchase Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="purchase_date"
                          name="purchase_date"
                          value={myFormik.values.purchase_date}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="purchase_type" className="form-label fw-medium">
                          Purchase Type <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="purchase_type"
                          name="purchase_type"
                          value={myFormik.values.purchase_type}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Raw Materials">Raw Materials</option>
                          <option value="Equipment">Equipment</option>
                          <option value="Office Supplies">Office Supplies</option>
                          <option value="Services">Services</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="purchase_product" className="form-label fw-medium">
                          Product/Service <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="purchase_product"
                          name="purchase_product"
                          placeholder="Enter product or service name"
                          value={myFormik.values.purchase_product}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="purchase_person" className="form-label fw-medium">
                          Purchase Person <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="purchase_person"
                          name="purchase_person"
                          placeholder="Who authorized this purchase?"
                          value={myFormik.values.purchase_person}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="purchase_supplier" className="form-label fw-medium">
                          Supplier <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="purchase_supplier"
                          name="purchase_supplier"
                          placeholder="Supplier or vendor name"
                          value={myFormik.values.purchase_supplier}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="purchase_amount" className="form-label fw-medium">
                          Amount (₹) <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" style={{ borderRadius: '6px 0 0 6px' }}>₹</span>
                          <input
                            type="number"
                            className="form-control"
                            id="purchase_amount"
                            name="purchase_amount"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            value={myFormik.values.purchase_amount}
                            onChange={myFormik.handleChange}
                            style={{ borderRadius: '0 6px 6px 0' }}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="purchase_commission" className="form-label fw-medium">
                          Commission (₹)
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" style={{ borderRadius: '6px 0 0 6px' }}>₹</span>
                          <input
                            type="number"
                            className="form-control"
                            id="purchase_commission"
                            name="purchase_commission"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            value={myFormik.values.purchase_commission}
                            onChange={myFormik.handleChange}
                            style={{ borderRadius: '0 6px 6px 0' }}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="payment_type" className="form-label fw-medium">
                          Payment Type <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="payment_type"
                          name="payment_type"
                          value={myFormik.values.payment_type}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        >
                          <option value="">Select Payment Type</option>
                          <option value="Cash">Cash</option>
                          <option value="Credit">Credit</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Digital Payment">Digital Payment</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row - Full Width */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="payment_condition" className="form-label fw-medium">
                          Payment Terms <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="payment_condition"
                          name="payment_condition"
                          placeholder="e.g., Net 30, Advance 50%"
                          value={myFormik.values.payment_condition}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="payment_date" className="form-label fw-medium">
                          Payment Due Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="payment_date"
                          name="payment_date"
                          value={myFormik.values.payment_date}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '6px' }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn py-2 fw-medium"
                      onClick={() => navigate("/viewPurchaseHistory")}
                      style={{ 
                        backgroundColor: '#6c757d',
                        color: 'white',
                        borderRadius: '6px',
                        border: 'none',
                        width: '48%'
                      }}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Back to History
                    </button>
                    <button
                      type="submit"
                      className="btn py-2 fw-medium"
                      style={{ 
                        backgroundColor: '#795FCD',
                        color: 'white',
                        borderRadius: '6px',
                        border: 'none',
                        width: '48%'
                      }}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Update Purchase
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading purchase details...</p>
                </div>
              )}
            </div>

            <div className="card-footer" style={{ 
              backgroundColor: '#F9FAFE',
              color: '#6c757d',
              fontSize: '0.875rem',
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '0 0 12px 12px'
            }}>
              <div className="text-center">
                <small>
                  All fields marked with <span className="text-danger">*</span> are required
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default UpdatePurchase;