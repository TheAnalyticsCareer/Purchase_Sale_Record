// import React from "react";
// import { useFormik } from "formik";
// import axios from "axios";

// const PurchaseDept = () => {
//   //   const department = localStorage.getItem("department");

//   const myFormik = useFormik({
//     initialValues: {
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

//     onSubmit: async (values) => {
//       try {
//         const token = localStorage.getItem("token");
//         const companyName = localStorage.getItem("companyName");

//         if (!token) {
//           alert("You need to be log in to Submit Purchase Entries.");
//           return; //?
//         }

//         console.log("token while entrt for purchase-----", token);
//         console.log("company name while entry for purchase--", companyName);

//         const res = await axios.post(
//           `http://localhost:5000/purchase//purchaseEntry/${companyName}`,
//           values,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         myFormik.resetForm();

//         alert("Entry submitted");
//       } catch (err) {
//         console.log(err);
//       }
//     },
//   });

//   return (
//     <>
//       <div className="container">
//         <form onSubmit={myFormik.handleSubmit}>
//           <div>
//             <input
//               type="date"
//               name="purchase_date"
//               id="purchase-date"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.purchase_date}
//               placeholder="Purchase Date"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="purchase_type"
//               id="purchase-type"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.purchase_type}
//               placeholder="Purchase Type"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="purchase_product"
//               id="purchase-product"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.purchase_product}
//               placeholder="Purchase Product"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="purchase_person"
//               id="purchase-person"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.purchase_person}
//               placeholder="Purchase Person"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="purchase_supplier"
//               id="purchase-supplier"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.purchase_supplier}
//               placeholder="Purchase Supplier"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="number"
//               name="purchase_amount"
//               id="purchase-amount"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.purchase_amount}
//               placeholder="Purchase Amount"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="number"
//               name="purchase_commission"
//               id="purchase-commission"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.purchase_commission}
//               placeholder="Purchase Commission"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="payment_type"
//               id="payment-type"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.payment_type}
//               placeholder="Payment Type"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="payment_condition"
//               id="payment-condition"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.payment_condition}
//               placeholder="Payment Condition"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="date"
//               name="payment_date"
//               id="payment-date"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.payment_date}
//               placeholder="Payment Date"
//               required
//             />
//           </div>

//           <div>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PurchaseDept;





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
          `http://localhost:5000/purchase/purchaseEntry/${companyName}`,
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
          {[
            { name: "purchase_date", type: "text", label: "Purchase Date", placeholder: "YYYY-MM-DD" },
            { name: "purchase_type", type: "text", label: "Purchase Type", placeholder: "Type of Purchase" },
            { name: "purchase_product", type: "text", label: "Purchase Product", placeholder: "Product Name" },
            { name: "purchase_person", type: "text", label: "Purchase Person", placeholder: "Person Responsible" },
            { name: "purchase_supplier", type: "text", label: "Purchase Supplier", placeholder: "Supplier Name" },
            { name: "purchase_amount", type: "text", label: "Purchase Amount", placeholder: "Enter Amount" },
            { name: "purchase_commission", type: "text", label: "Purchase Commission", placeholder: "Commission Amount" },
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

export default PurchaseDept;
