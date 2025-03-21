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
//   const [date, setDate]=useState("")

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

//       let selectedMonth = month || today.getMonth() + 1;
//       let selectedYear = year || today.getFullYear();
//       let selectedDate=date 

//       // console.log("Fetching for Month:", selectedMonth);
//       // console.log("Fetching for Year:", selectedYear);

//       const res = await axios.get(
//         `https://purchase-sale-logic.onrender.com/purchase/viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
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

//   // ------------get date-------------------------

//   const getDate = (e) => {
//     let inputDate = e.target.value;
  
//     if (inputDate < 1) {
//       inputDate = 1;
//     } else if (inputDate > 31) {
//       inputDate = 31;
//     }
  
//     setDate(inputDate);
   
//     console.log("Selected Date:", inputDate);
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
  const [date, setDate]=useState("")

  const { searchText, triggerSearch, setTriggerSearch } =
    useContext(SearchContext);
  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");

  // ---------------------------view purchase history-------------------------

  const getPurchaseHistory = async () => {
    try {
      if (!token) {
        alert("You need to login to view purchase history");
        return;
      }

      let selectedMonth = month || today.getMonth() + 1;
      let selectedYear = year || today.getFullYear();
      let selectedDate=date ;
      // let selectedDate = date || null;


      console.log("Fetching for Month:", selectedMonth);
      console.log("Fetching for Year:", selectedYear);
      console.log("Fetching for date:", selectedDate);

      if(date===""){
        const res = await axios.get(
          `https://purchase-sale-logic.onrender.com/purchase//viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        setData(res?.data.result);
      }

      // ------------------------------------------------------------------------------
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/purchase//viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(res?.data.result);
    } catch (err) {
      console.log("Error fetching purchase history:", err);
    }
  };

  // --------------------------search-------------------------------------

  const search = async () => {
    try {
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/purchase/searchPurchaseRecord/${companyName}/${searchText}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res?.data);
    } catch (err) {
      console.log("Error searching:", err);
    }
  };

  // -----------------delete purchase history------------------------------

  const deletePurchaseEntry = async (purchase_id) => {
    try {
      if (!token) {
        alert("You need to login to perform the delete action");
        return;
      }

      const option = window.confirm("You are about to delete a purchase entry");
      if (!option) return;

      await axios.delete(
        `https://purchase-sale-logic.onrender.com/purchase/deletePurchaseRecord/${companyName}/${purchase_id}`,
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

  // ------------get date-------------------------

  // const getDate = (e) => {
  //   let inputDate = e.target.value;
  
  //   if (inputDate < 1) {
  //     inputDate = 1;
  //   } else if (inputDate > 31) {
  //     inputDate = 31;
  //   }
  
  //   setDate(inputDate);
   
  //   console.log("Selected Date:", inputDate);
  // };


  const getDate = (e) => {
    let inputDate = e.target.value;
    if (inputDate < 1 || inputDate > 31) {
      inputDate = ""; 
    }
    setDate(inputDate);
  };

  // ------------get month---------------------------
  const getMonth = (e) => {
    let inputMonth = e.target.value;

    if (inputMonth < 1) {
      inputMonth = today.getMonth() + 1;
    } else if (inputMonth > 12) {
      inputMonth = today.getMonth() + 1;
    }

    setMonth(inputMonth);

    if (inputMonth === "") {
      setMonth(today.getMonth() + 1);
    }
  };

  // --------------get year--------------------------

  const getYear = (e) => {
    let inputYear = e.target.value;

    if (inputYear.length > 4) {
      inputYear = inputYear.slice(0, 4);
    }

    setYear(inputYear);

    if (inputYear === "") {
      setYear(today.getFullYear());
    }
  };

  // --------------------------------------------------------------------
  useEffect(() => {
    getPurchaseHistory();
  }, []);

  useEffect(() => {
    if (triggerSearch) {
      search();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  // -------------------------------------------------------------------------

  return (
    <div className="container mt-4">
      <div className="text-center text-light bg-dark p-4 rounded shadow-lg w-50 mx-auto my-5">
        <h3 className="mb-3">Purchase History</h3>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <input
            type="number"
            min="1"
            max="31"
            step="1"
            className="form-control text-center"
            onChange={(e) => getDate(e)}
            placeholder="Date (1-31)"
            required
            style={{ maxWidth: "150px" }}
          />
          <input
            type="number"
            min="1"
            max="12"
            step="1"
            className="form-control text-center"
            onChange={(e) => getMonth(e)}
            placeholder="Month (1-12)"
            required
            style={{ maxWidth: "150px" }}
          />
          <input
            type="number"
            min="1900"
            max="2100"
            step="1"
            className="form-control text-center"
            onChange={(e) => getYear(e)}
            placeholder="Year"
            required
            style={{ maxWidth: "150px" }}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={() => getPurchaseHistory()}
        >
          Submit
        </button>
      </div>

      {data?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center">
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
            <tbody className="table-light">
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
