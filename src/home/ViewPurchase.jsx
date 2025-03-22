

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { SearchContext } from "../components/header/SearchContext";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

// const ViewPurchase = () => {
//   const [data, setData] = useState([]);
//   const today = new Date();

//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [date, setDate] = useState("");
  
//   const [purchaseType, setPurchaseType] = useState("");
//   const [purchaseProduct, setPurchaseProduct] = useState("");
//   const [purchasePerson, setPurchasePerson] = useState("");
//   const [purchaseSupplier, setPurchaseSupplier] = useState("");

//   const { searchText, triggerSearch, setTriggerSearch } =
//     useContext(SearchContext);
//   const companyName = localStorage.getItem("companyName");
//   const token = localStorage.getItem("token");

//   // ---------------------------view purchase history-------------------------

//   const getPurchaseHistory = async () => {
//     try {
//       if (!token) {
//         alert("You need to login to view purchase history");
//         return;
//       }

//       // ---------------filter by purchase-typr,product,person,suppler,--------

//       if(purchaseType.length>0 || purchaseProduct.length>0 || purchasePerson.length>0 || purchaseSupplier.length>0){
//         const res = await axios.get(
//           `https://purchase-sale-logic.onrender.com/purchase//viewPurchaseRecord/${companyName}/${purchaseType}/${purchaseProduct}/${purchasePerson}/${purchaseSupplier}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setData(res?.data.result);
//       }



//       let selectedMonth = month || today.getMonth() + 1;
//       let selectedYear = year || today.getFullYear();
//       let selectedDate = date;
//       // let selectedDate = date || null;

//       console.log("Fetching for Month:", selectedMonth);
//       console.log("Fetching for Year:", selectedYear);
//       console.log("Fetching for date:", selectedDate);

//       if (date === "") {
//         const res = await axios.get(
//           `https://purchase-sale-logic.onrender.com/purchase//viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setData(res?.data.result);
//       }

//       // ------------------------------------------------------------------------------
//       const res = await axios.get(
//         `https://purchase-sale-logic.onrender.com/purchase//viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setData(res?.data.result);
//     } catch (err) {
//       console.log("Error fetching purchase history:", err);
//     }
//   };

//   // --------------------------search-------------------------------------

//   const search = async () => {
//     try {
//       const res = await axios.get(
//         `https://purchase-sale-logic.onrender.com/purchase/searchPurchaseRecord/${companyName}/${searchText}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setData(res?.data);
//     } catch (err) {
//       console.log("Error searching:", err);
//     }
//   };

//   // -----------------delete purchase history------------------------------

//   const deletePurchaseEntry = async (purchase_id) => {
//     try {
//       if (!token) {
//         alert("You need to login to perform the delete action");
//         return;
//       }

//       const option = window.confirm("You are about to delete a purchase entry");
//       if (!option) return;

//       await axios.delete(
//         `https://purchase-sale-logic.onrender.com/purchase/deletePurchaseRecord/${companyName}/${purchase_id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Deleted Successfully");
//       getPurchaseHistory();
//     } catch (err) {
//       console.log("Error deleting purchase entry:", err);
//       alert("Failed to delete entry. Please try again.");
//     }
//   };

  


// // ----------------get purchase type-----------------

// const getPurchaseType=(e)=>{
//   setPurchaseType(e.target.value)
// }

// // -----------------get purchase product-----------------

// const getPurchaseProduct=(e)=>{
//   setPurchaseProduct(e.target.value)
// }

// // ----------------get purchase person---------------


// const getPurchasePerson=(e)=>{
//   setPurchasePerson(e.target.value)
// }


// // ------------------get purchase supplier----------------

// const getPurchaseSupplier=(e)=>{
//   setPurchaseSupplier(e.target.value)
// }

//   // ------------get date-------------------------

//   const getDate = (e) => {
//     let inputDate = e.target.value;
//     if (inputDate < 1 || inputDate > 31) {
//       inputDate = "";
//     }
//     setDate(inputDate);
//   };

//   // ------------get month---------------------------
//   const getMonth = (e) => {
//     let inputMonth = e.target.value;

//     if (inputMonth < 1) {
//       inputMonth = today.getMonth() + 1;
//     } else if (inputMonth > 12) {
//       inputMonth = today.getMonth() + 1;
//     }

//     setMonth(inputMonth);

//     if (inputMonth === "") {
//       setMonth(today.getMonth() + 1);
//     }
//   };

//   // --------------get year--------------------------

//   const getYear = (e) => {
//     let inputYear = e.target.value;

//     if (inputYear.length > 4) {
//       inputYear = inputYear.slice(0, 4);
//     }

//     setYear(inputYear);

//     if (inputYear === "") {
//       setYear(today.getFullYear());
//     }
//   };

//   // --------------------------------------------------------------------
//   useEffect(() => {
//     getPurchaseHistory();
//   }, []);

//   useEffect(() => {
//     if (triggerSearch) {
//       search();
//       setTriggerSearch(false);
//     }
//   }, [triggerSearch]);

//   // -------------------------------------------------------------------------

//   return (
//     <div className="container mt-4">
//       <div className="text-center text-light bg-dark p-4 rounded shadow-lg w-50 mx-auto my-5">
//         <h3 className="mb-3">Purchase History</h3>

//         <div className="d-flex justify-content-center gap-3 mb-3">
        

//           <input
//             type="text"
//             className="form-control text-center"
//             onChange={(e) => getPurchaseType(e)}
//             placeholder="Purchase Type"
//             style={{ maxWidth: "150px" }}
//           />
//           <input
//             type="text"
//             className="form-control text-center"
//             onChange={(e) => getPurchaseProduct(e)}
//             placeholder="Purchase Product"
//             style={{ maxWidth: "150px" }}
//           />

//           <input
//             type="text"
//             className="form-control text-center"
//             onChange={(e) => getPurchasePerson(e)}
//             placeholder="Purchase Person"
//             style={{ maxWidth: "150px" }}
//           />

//           <input
//             type="text"
//             className="form-control text-center"
//             onChange={(e) => getPurchaseSupplier(e)}
//             placeholder="Purchase Supplier"
//             style={{ maxWidth: "150px" }}
//           />

//           <input
//             type="number"
//             min="1"
//             max="31"
//             step="1"
//             className="form-control text-center"
//             onChange={(e) => getDate(e)}
//             placeholder="Date (1-31)"
//             required
//             style={{ maxWidth: "150px" }}
//           />
//           <input
//             type="number"
//             min="1"
//             max="12"
//             step="1"
//             className="form-control text-center"
//             onChange={(e) => getMonth(e)}
//             placeholder="Month (1-12)"
//             required
//             style={{ maxWidth: "150px" }}
//           />
//           <input
//             type="number"
//             min="1900"
//             max="2100"
//             step="1"
//             className="form-control text-center"
//             onChange={(e) => getYear(e)}
//             placeholder="Year"
//             required
//             style={{ maxWidth: "150px" }}
//           />
//         </div>

//         <button
//           className="btn btn-primary"
//           onClick={() => getPurchaseHistory()}
//         >
//           Submit
//         </button>
//       </div>

//       {data?.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-hover table-bordered text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>Purchase Date</th>
//                 <th>Purchase Type</th>
//                 <th>Purchase Product</th>
//                 <th>Purchase Person</th>
//                 <th>Purchase Supplier</th>
//                 <th>Purchase Amount</th>
//                 <th>Purchase Commission</th>
//                 <th>Payment Type</th>
//                 <th>Payment Condition</th>
//                 <th>Payment Date</th>
//                 <th>Created At</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="table-light">
//               {data.map((list) => (
//                 <tr key={list.purchase_id}>
//                   <td>
//                     {new Date(list.purchase_date).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>{list.purchase_type}</td>
//                   <td>{list.purchase_product}</td>
//                   <td>{list.purchase_person}</td>
//                   <td>{list.purchase_supplier}</td>
//                   <td>₹ {Number(list.purchase_amount || 0).toFixed(2)}</td>
//                   <td>₹ {Number(list.purchase_commission || 0).toFixed(2)}</td>
//                   <td>{list.payment_type}</td>
//                   <td>{list.payment_condition}</td>
//                   <td>
//                     {new Date(list.payment_date).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>
//                     {new Date(list.created_at).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>
//                     <Link to={`/updatePurchase/${list.purchase_id}`}>
//                       <button className="btn btn-sm btn-success m-1">
//                         Update
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => deletePurchaseEntry(list.purchase_id)}
//                       className="btn btn-sm btn-danger m-1"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-danger mt-3">
//           No Purchase History Found
//         </p>
//       )}
//     </div>
//   );
// };

// export default ViewPurchase;




// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { SearchContext } from "../components/header/SearchContext";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

// const ViewPurchase = () => {
//   const [data, setData] = useState([]);
//   const today = new Date();

//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [date, setDate] = useState("");

//   const [purchaseType, setPurchaseType] = useState(null);
//   const [purchaseProduct, setPurchaseProduct] = useState(null);
//   const [purchasePerson, setPurchasePerson] = useState(null);
//   const [purchaseSupplier, setPurchaseSupplier] = useState(null);
//   const [createdAt, setCreatedAt] = useState(null);

//   const { searchText, triggerSearch, setTriggerSearch } =
//     useContext(SearchContext);
//   const companyName = localStorage.getItem("companyName");
//   const token = localStorage.getItem("token");

//   // ---------------------------view purchase history-------------------------

//   // const getPurchaseHistory = async () => {
//   //   try {
//   //     if (!token) {
//   //       alert("You need to login to view purchase history");
//   //       return;
//   //     }

//   //     if(purchaseType.length>0 || purchaseProduct.length>0 || purchasePerson.length>0 || purchaseSupplier.length>0){
//   //       const res = await axios.get(
//   //         `http://localhost:5000/purchase//filterPurchaseRecord/${companyName}/${purchaseType}/${purchaseProduct}/${purchasePerson}/${purchaseSupplier}`,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );

//   //       setData(res?.data.result);
//   //     }

//   //     let selectedMonth = month || today.getMonth() + 1;
//   //     let selectedYear = year || today.getFullYear();
//   //     let selectedDate=date ;
//   //     // let selectedDate = date || null;

//   //     console.log("Fetching for Month:", selectedMonth);
//   //     console.log("Fetching for Year:", selectedYear);
//   //     console.log("Fetching for date:", selectedDate);

//   //     if(date===""){
//   //       const res = await axios.get(
//   //         `http://localhost:5000/purchase//viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}`,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );

//   //       setData(res?.data.result);
//   //     }

//   //     // ------------------------------------------------------------------------------
//   //     const res = await axios.get(
//   //       `http://localhost:5000/purchase//viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );

//   //     setData(res?.data.result);
//   //   } catch (err) {
//   //     console.log("Error fetching purchase history:", err);
//   //   }
//   // };

//   const getPurchaseHistory = async () => {
//     try {
//       if (!token) {
//         alert("You need to login to view purchase history");
//         return;
//       }

//       let selectedMonth = month || today.getMonth() + 1;
//       let selectedYear = year || today.getFullYear();
//       let selectedDate = date;

//       let res;

//       if (
//         purchaseType ||
//         purchaseProduct ||
//         purchasePerson ||
//         purchaseSupplier ||
//         createdAt
//       ) {
//         // res = await axios.get(
//         //   `http://localhost:5000/purchase/filterPurchaseRecord/${companyName}/${
//         //     purchaseType || "null"
//         //   }/${purchaseProduct || "null"}/${purchasePerson || "null"}/${
//         //     purchaseSupplier || "null"
//         //   }/${createdAt || "null"}`,
//         //   {
//         //     headers: { Authorization: `Bearer ${token}` },
//         //   }
//         // );

//         res = await axios.get(
//           `http://localhost:5000/purchase/filterPurchaseRecord/${companyName}/${
//             purchaseType ? purchaseType : "null"
//           }/${purchaseProduct ? purchaseProduct : "null"}/${
//             purchasePerson ? purchasePerson : "null"
//           }/${purchaseSupplier ? purchaseSupplier : "null"}/${
//             createdAt ? createdAt : "null"
//           }`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
        



//       } else if (selectedDate) {
//         res = await axios.get(
//           `http://localhost:5000/purchase/viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       } else {
//         res = await axios.get(
//           `http://localhost:5000/purchase/viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       }

//       setData(res?.data.result || []);
//     } catch (err) {
//       console.log("Error fetching purchase history:", err);
//     }
//   };

//   // useEffect(() => {
//   //   getPurchaseHistory();
//   // }, [
//   //   // purchaseType,
//   //   // purchaseProduct,
//   //   // purchasePerson,
//   //   // purchaseSupplier,
//   //   // month,
//   //   // year,
//   //   // date,

//   // ]);

//   // --------------------------search-------------------------------------

//   const search = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/purchase/searchPurchaseRecord/${companyName}/${searchText}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setData(res?.data);
//     } catch (err) {
//       console.log("Error searching:", err);
//     }
//   };

//   // -----------------delete purchase history------------------------------

//   const deletePurchaseEntry = async (purchase_id) => {
//     try {
//       if (!token) {
//         alert("You need to login to perform the delete action");
//         return;
//       }

//       const option = window.confirm("You are about to delete a purchase entry");
//       if (!option) return;

//       await axios.delete(
//         `http://localhost:5000/purchase/deletePurchaseRecord/${companyName}/${purchase_id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Deleted Successfully");
//       getPurchaseHistory();
//     } catch (err) {
//       console.log("Error deleting purchase entry:", err);
//       alert("Failed to delete entry. Please try again.");
//     }
//   };

//   // ----------------get purchase type-----------------

//   const getPurchaseType = (e) => {
//     setPurchaseType(e.target.value);
//   };

//   // -----------------get purchase product-----------------

//   const getPurchaseProduct = (e) => {
//     setPurchaseProduct(e.target.value);
//   };

//   // ----------------get purchase person---------------

//   const getPurchasePerson = (e) => {
//     setPurchasePerson(e.target.value);
//   };

//   // ------------------get purchase supplier----------------

//   const getPurchaseSupplier = (e) => {
//     setPurchaseSupplier(e.target.value);
//   };

//   // -----------------get created at---------------------

//   const getCreatedAt = (e) => {
//     setCreatedAt(e.target.value);
//   };

//   // ------------get date-------------------------

//   const getDate = (e) => {
//     let inputDate = e.target.value;
//     if (inputDate < 1 || inputDate > 31) {
//       inputDate = "";
//     }
//     setDate(inputDate);
//   };

//   // ------------get month---------------------------
//   const getMonth = (e) => {
//     let inputMonth = e.target.value;

//     if (inputMonth < 1) {
//       inputMonth = today.getMonth() + 1;
//     } else if (inputMonth > 12) {
//       inputMonth = today.getMonth() + 1;
//     }

//     setMonth(inputMonth);

//     if (inputMonth === "") {
//       setMonth(today.getMonth() + 1);
//     }
//   };

//   // --------------get year--------------------------

//   const getYear = (e) => {
//     let inputYear = e.target.value;

//     if (inputYear.length > 4) {
//       inputYear = inputYear.slice(0, 4);
//     }

//     setYear(inputYear);

//     if (inputYear === "") {
//       setYear(today.getFullYear());
//     }
//   };

//   // --------------------------------------------------------------------
//   useEffect(() => {
//     getPurchaseHistory();
//   }, []);

//   useEffect(() => {
//     if (triggerSearch) {
//       search();
//       setTriggerSearch(false);
//     }
//   }, [triggerSearch]);

//   // -------------------------------------------------------------------------

//   return (
//     <div className="container mt-4">
//       <div className="text-center text-light bg-dark p-4 rounded shadow-lg w-50 mx-auto my-5">
//         <h3 className="mb-3">Purchase History</h3>

//         <input
//           type="text"
//           className="form-control text-center"
//           onChange={(e) => getPurchaseType(e)}
//           placeholder="Purchase Type"
//           style={{ maxWidth: "150px" }}
//         />
//         <input
//           type="text"
//           className="form-control text-center"
//           onChange={(e) => getPurchaseProduct(e)}
//           placeholder="Purchase Product"
//           style={{ maxWidth: "150px" }}
//         />

//         <input
//           type="text"
//           className="form-control text-center"
//           onChange={(e) => getPurchasePerson(e)}
//           placeholder="Purchase Person"
//           style={{ maxWidth: "150px" }}
//         />

//         <input
//           type="text"
//           className="form-control text-center"
//           onChange={(e) => getPurchaseSupplier(e)}
//           placeholder="Purchase Supplier"
//           style={{ maxWidth: "150px" }}
//         />

//         <div className="d-flex justify-content-center gap-3 mb-3">
//           <input
//             type="number"
//             min="1"
//             max="31"
//             step="1"
//             className="form-control text-center"
//             onChange={(e) => getDate(e)}
//             placeholder="Date (1-31)"
//             required
//             style={{ maxWidth: "150px" }}
//           />
//           <input
//             type="number"
//             min="1"
//             max="12"
//             step="1"
//             className="form-control text-center"
//             onChange={(e) => getMonth(e)}
//             placeholder="Month (1-12)"
//             required
//             style={{ maxWidth: "150px" }}
//           />
//           <input
//             type="number"
//             min="1900"
//             max="2100"
//             step="1"
//             className="form-control text-center"
//             onChange={(e) => getYear(e)}
//             placeholder="Year"
//             required
//             style={{ maxWidth: "150px" }}
//           />
//           <input
//             type="date"
//             className="form-control text-center"
//             onChange={(e) => getCreatedAt(e)}
//             placeholder="Created At"
//             style={{ maxWidth: "150px" }}
//           />
//         </div>

//         <button
//           className="btn btn-primary"
//           onClick={() => getPurchaseHistory()}
//         >
//           Submit
//         </button>
//       </div>

//       {data?.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-hover table-bordered text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>Purchase Date</th>
//                 <th>Purchase Type</th>
//                 <th>Purchase Product</th>
//                 <th>Purchase Person</th>
//                 <th>Purchase Supplier</th>
//                 <th>Purchase Amount</th>
//                 <th>Purchase Commission</th>
//                 <th>Payment Type</th>
//                 <th>Payment Condition</th>
//                 <th>Payment Date</th>
//                 <th>Created At</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="table-light">
//               {data.map((list) => (
//                 <tr key={list.purchase_id}>
//                   <td>
//                     {new Date(list.purchase_date).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>{list.purchase_type}</td>
//                   <td>{list.purchase_product}</td>
//                   <td>{list.purchase_person}</td>
//                   <td>{list.purchase_supplier}</td>
//                   <td>₹ {Number(list.purchase_amount || 0).toFixed(2)}</td>
//                   <td>₹ {Number(list.purchase_commission || 0).toFixed(2)}</td>
//                   <td>{list.payment_type}</td>
//                   <td>{list.payment_condition}</td>
//                   <td>
//                     {new Date(list.payment_date).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>
//                     {new Date(list.created_at).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>
//                     <Link to={`/updatePurchase/${list.purchase_id}`}>
//                       <button className="btn btn-sm btn-success m-1">
//                         Update
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => deletePurchaseEntry(list.purchase_id)}
//                       className="btn btn-sm btn-danger m-1"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-danger mt-3">
//           No Purchase History Found
//         </p>
//       )}
//     </div>
//   );
// };

// export default ViewPurchase;


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../components/header/SearchContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const ViewPurchase = () => {
  const [data, setData] = useState([]);
  const today = new Date();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");

  const [purchaseType, setPurchaseType] = useState(null);
  const [purchaseProduct, setPurchaseProduct] = useState(null);
  const [purchasePerson, setPurchasePerson] = useState(null);
  const [purchaseSupplier, setPurchaseSupplier] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const { searchText, triggerSearch, setTriggerSearch } =
    useContext(SearchContext);
  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");

  // Fetch purchase history
  const getPurchaseHistory = async () => {
    try {
      if (!token) {
        alert("You need to login to view purchase history");
        return;
      }

      let selectedMonth = month || today.getMonth() + 1;
      let selectedYear = year || today.getFullYear();
      let selectedDate = date;

      let res;

      if (
        purchaseType ||
        purchaseProduct ||
        purchasePerson ||
        purchaseSupplier ||
        createdAt
      ) {
        res = await axios.get(
          `http://localhost:5000/purchase/filterPurchaseRecord/${companyName}/${
            purchaseType ? purchaseType : "null"
          }/${purchaseProduct ? purchaseProduct : "null"}/${
            purchasePerson ? purchasePerson : "null"
          }/${purchaseSupplier ? purchaseSupplier : "null"}/${
            createdAt ? createdAt : "null"
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (selectedDate) {
        res = await axios.get(
          `http://localhost:5000/purchase/viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.get(
          `http://localhost:5000/purchase/viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setData(res?.data.result || []);
    } catch (err) {
      console.log("Error fetching purchase history:", err);
    }
  };

  // Search functionality
  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/purchase/searchPurchaseRecord/${companyName}/${searchText}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res?.data);
    } catch (err) {
      console.log("Error searching:", err);
    }
  };

  // Delete purchase entry
  const deletePurchaseEntry = async (purchase_id) => {
    try {
      if (!token) {
        alert("You need to login to perform the delete action");
        return;
      }

      const option = window.confirm("You are about to delete a purchase entry");
      if (!option) return;

      await axios.delete(
        `http://localhost:5000/purchase/deletePurchaseRecord/${companyName}/${purchase_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Deleted Successfully");
      getPurchaseHistory();
    } catch (err) {
      console.log("Error deleting purchase entry:", err);
      alert("Failed to delete entry. Please try again.");
    }
  };

  // Event handlers for filters
  const getPurchaseType = (e) => setPurchaseType(e.target.value);
  const getPurchaseProduct = (e) => setPurchaseProduct(e.target.value);
  const getPurchasePerson = (e) => setPurchasePerson(e.target.value);
  const getPurchaseSupplier = (e) => setPurchaseSupplier(e.target.value);
  const getCreatedAt = (e) => setCreatedAt(e.target.value);

  const getDate = (e) => {
    let inputDate = e.target.value;
    if (inputDate < 1 || inputDate > 31) inputDate = "";
    setDate(inputDate);
  };

  const getMonth = (e) => {
    let inputMonth = e.target.value;
    if (inputMonth < 1 || inputMonth > 12) inputMonth = today.getMonth() + 1;
    setMonth(inputMonth);
  };

  const getYear = (e) => {
    let inputYear = e.target.value;
    if (inputYear.length > 4) inputYear = inputYear.slice(0, 4);
    setYear(inputYear);
  };

  // Fetch data on component mount
  useEffect(() => {
    getPurchaseHistory();
  }, []);

  // Trigger search when searchText changes
  useEffect(() => {
    if (triggerSearch) {
      search();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  return (
    <div className="container mt-4">
      {/* Filter Section */}
      <div className="card shadow-lg mb-5">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Purchase History</h3>
          <div className="row g-3">
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getPurchaseType}
                placeholder="Purchase Type"
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getPurchaseProduct}
                placeholder="Purchase Product"
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getPurchasePerson}
                placeholder="Purchase Person"
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getPurchaseSupplier}
                placeholder="Purchase Supplier"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                min="1"
                max="31"
                className="form-control"
                onChange={getDate}
                placeholder="Purchase Date"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                min="1"
                max="12"
                className="form-control"
                onChange={getMonth}
                placeholder="Purchase Month"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                min="1900"
                max="2100"
                className="form-control"
                onChange={getYear}
                placeholder="Purchase Year"
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                onChange={getCreatedAt}
                placeholder="Created At"
              />
            </div>
            <div className="col-md-2 d-grid">
              <button
                className="btn btn-primary"
                onClick={getPurchaseHistory}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {data?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Purchase Date</th>
                <th>Purchase Type</th>
                <th>Purchase Product</th>
                <th>Purchase Person</th>
                <th>Purchase Supplier</th>
                <th>Purchase Amount</th>
                <th>Purchase Commission</th>
                <th>Payment Type</th>
                <th>Payment Condition</th>
                <th>Payment Date</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((list) => (
                <tr key={list.purchase_id}>
                  <td>
                    {new Date(list.purchase_date).toLocaleDateString("en-CA")}
                  </td>
                  <td>{list.purchase_type}</td>
                  <td>{list.purchase_product}</td>
                  <td>{list.purchase_person}</td>
                  <td>{list.purchase_supplier}</td>
                  <td>₹ {Number(list.purchase_amount || 0).toFixed(2)}</td>
                  <td>₹ {Number(list.purchase_commission || 0).toFixed(2)}</td>
                  <td>{list.payment_type}</td>
                  <td>{list.payment_condition}</td>
                  <td>
                    {new Date(list.payment_date).toLocaleDateString("en-CA")}
                  </td>
                  <td>
                    {new Date(list.created_at).toLocaleDateString("en-CA")}
                  </td>
                  <td>
                    <Link to={`/updatePurchase/${list.purchase_id}`}>
                      <button className="btn btn-sm btn-success m-1">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => deletePurchaseEntry(list.purchase_id)}
                      className="btn btn-sm btn-danger m-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-danger mt-3">
          No Purchase History Found
        </p>
      )}
    </div>
  );
};

export default ViewPurchase;