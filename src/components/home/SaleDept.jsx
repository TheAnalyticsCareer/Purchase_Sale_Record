// import React from "react";
// import { useFormik } from "formik";
// import axios from "axios";

// const SaleDept = () => {
//   //   const department = localStorage.getItem("department");

//   const myFormik = useFormik({
//     initialValues: {
//       sale_date: "",
//       sale_type: "",
//       sale_product: "",
//       sale_person: "",
//       sale_customer: "",
//       sale_amount: "",
//       sale_commission: "",
//       payment_type: "",
//       payment_condition: "",
//       payment_date: "",
//     },

//     onSubmit: async (values) => {
//       try {
//         const token = localStorage.getItem("token");
//         const companyName = localStorage.getItem("companyName");

//         if (!token) {
//           alert("You need to be log in to Submit Sale Entries.");
//           return; //?
//         }

//         console.log("token while entrt for sale-----", token);
//         console.log("company name while entry for sale--", companyName);

//         const res = await axios.post(
//           `http://localhost:5000/sales//salesEntry/${companyName}`,
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
//               name="sale_date"
//               id="sale-date"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.sale_date}
//               placeholder="Sale Date"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="sale_type"
//               id="sale-type"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.sale_type}
//               placeholder="Sale Type"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="sale_product"
//               id="sale-product"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.sale_product}
//               placeholder="Sale Product"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="sale_person"
//               id="sale-person"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.sale_person}
//               placeholder="Sale Person"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="sale_customer"
//               id="sale-customer"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.sale_customer}
//               placeholder="Sale Customer"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="number"
//               name="sale_amount"
//               id="sale-amount"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.sale_amount}
//               placeholder="Sale Amount"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="number"
//               name="sale_commission"
//               id="sale-commission"
//               onChange={myFormik.handleChange}
//               value={myFormik.values.sale_commission}
//               placeholder="Sale Commission"
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

// export default SaleDept;



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
          `http://localhost:5000/sales/salesEntry/${companyName}`,
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
