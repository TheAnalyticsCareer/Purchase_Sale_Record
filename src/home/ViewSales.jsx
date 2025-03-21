

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { SearchContext } from "../components/header/SearchContext";

// const ViewSales = () => {
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const today = new Date();
//   const [data, setData] = useState("");
//   const { searchText, triggerSearch, setTriggerSearch } =
//     useContext(SearchContext);

//   const companyName = localStorage.getItem("companyName");
//   const token = localStorage.getItem("token");

//   // ----------------sale history------------------------------------------

  

//   const getSalesHistory = async () => {
//     try {
//       if (!token) {
//         alert("You need to login to view sales history");
//         return;
//       }

//       let selectedMonth = month || today.getMonth() + 1;
//       let selectedYear = year || today.getFullYear();

//       // console.log("Fetching for Month:", selectedMonth);
//       // console.log("Fetching for Year:", selectedYear);

//       const res = await axios.get(
//         `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setData(res?.data.result);
//     } catch (err) {
//       console.log("Error fetching sales history:", err);
//     }
//   };

//   // ------------------search---------------------------------------------------

//   const search = async () => {
//     try {
//       const res = await axios.get(
//         `https://purchase-sale-logic.onrender.com/sales/searchSalesRecord/${companyName}/${searchText}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData(res?.data.results);
//     } catch (err) {
//       console.log("Error searching sales records:", err);
//     }
//   };

//   const deleteSaleEntry = async (sale_id) => {
//     try {
//       if (!token) {
//         alert("You need to login to perform the delete action");
//         return;
//       }

//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this sale entry?"
//       );
//       if (!confirmDelete) return;

//       await axios.delete(
//         `https://purchase-sale-logic.onrender.com/sales/deleteSalesRecord/${companyName}/${sale_id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Deleted Successfully");
//       getSalesHistory();
//     } catch (err) {
//       console.log("Error deleting sale entry:", err);
//       alert("Failed to delete entry. Please try again.");
//     }
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

//   useEffect(() => {
//     getSalesHistory();
//   }, []);

//   useEffect(() => {
//     if (triggerSearch) {
//       search();
//       setTriggerSearch(false);
//     }
//   }, [triggerSearch]);

//   return (
//     <div className="container mt-4">
      

//       <div className="text-center text-light bg-dark p-4 rounded shadow-lg w-50 mx-auto my-5">
//         <h3 className="mb-3">Salesssssss History</h3>
//         <div className="d-flex justify-content-center gap-3 mb-3">
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
//         <button className="btn btn-primary" onClick={() => getSalesHistory()}>
//           Submit
//         </button>
//       </div>

//       {data?.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-hover table-bordered text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>Sale Date</th>
//                 <th>Sale Type</th>
//                 <th>Sale Product</th>
//                 <th>Sale Person</th>
//                 <th>Sale Customer</th>
//                 <th>Sale Amount</th>
//                 <th>Sale Commission</th>
//                 <th>Payment Type</th>
//                 <th>Payment Condition</th>
//                 <th>Payment Date</th>
//                 <th>Created At</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="table-light">
//               {data.map((list) => (
//                 <tr key={list.created_at}>
//                   <td>
//                     {new Date(list.sale_date).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>{list.sale_type}</td>
//                   <td>{list.sale_product}</td>
//                   <td>{list.sale_person}</td>
//                   <td>{list.sale_customer}</td>
//                   <td>
//                     {isNaN(Number(list.sale_amount))
//                       ? "N/A"
//                       : `₹ ${Number(list.sale_amount).toFixed(2)}`}
//                   </td>
//                   <td>
//                     {isNaN(Number(list.sale_commission))
//                       ? "N/A"
//                       : `₹ ${Number(list.sale_commission).toFixed(2)}`}
//                   </td>
//                   <td>{list.payment_type}</td>
//                   <td>{list.payment_condition}</td>
//                   <td>
//                     {new Date(list.payment_date).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>
//                     {new Date(list.created_at).toLocaleDateString("en-CA")}
//                   </td>
//                   <td>
//                     <Link to={`/updateSale/${list.sale_id}`}>
//                       <button className="btn btn-success btn-sm m-1">
//                         Update
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => deleteSaleEntry(list.sale_id)}
//                       className="btn btn-danger btn-sm m-1"
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
//         <p className="text-center text-danger mt-3">No Sales History Found</p>
//       )}
//     </div>
//   );
// };

// export default ViewSales;






import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../components/header/SearchContext";

const ViewSales = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate]=useState("")

  const today = new Date();
  const [data, setData] = useState("");
  const { searchText, triggerSearch, setTriggerSearch } =
    useContext(SearchContext);

  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");

  // ----------------sale history------------------------------------------

  

  const getSalesHistory = async () => {
    try {
      if (!token) {
        alert("You need to login to view sales history");
        return;
      }

      let selectedMonth = month || today.getMonth() + 1;
      let selectedYear = year || today.getFullYear();
      let selectedDate=date ;

      console.log("Fetching for Month:", selectedMonth);
      console.log("Fetching for Year:", selectedYear);
      console.log("Fetching for date:", selectedDate);

      if(date===""){
        const res = await axios.get(
          `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        setData(res?.data.result);
      }

      // ----------------------------------------------------------------

      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(res?.data.result);

     
    } catch (err) {
      console.log("Error fetching sales history:", err);
    }
  };

  // ------------------search---------------------------------------------------

  const search = async () => {
    try {
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/sales/searchSalesRecord/${companyName}/${searchText}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res?.data.results);
    } catch (err) {
      console.log("Error searching sales records:", err);
    }
  };

  const deleteSaleEntry = async (sale_id) => {
    try {
      if (!token) {
        alert("You need to login to perform the delete action");
        return;
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this sale entry?"
      );
      if (!confirmDelete) return;

      await axios.delete(
        `https://purchase-sale-logic.onrender.com/sales/deleteSalesRecord/${companyName}/${sale_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Deleted Successfully");
      getSalesHistory();
    } catch (err) {
      console.log("Error deleting sale entry:", err);
      alert("Failed to delete entry. Please try again.");
    }
  };



    // ------------get date-------------------------


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

  useEffect(() => {
    getSalesHistory();
  }, []);

  useEffect(() => {
    if (triggerSearch) {
      search();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  return (
    <div className="container mt-4">
      

      <div className="text-center text-light bg-dark p-4 rounded shadow-lg w-50 mx-auto my-5">
        <h3 className="mb-3">Sales History</h3>
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
        <button className="btn btn-primary" onClick={() => getSalesHistory()}>
          Submit
        </button>
      </div>

      {data?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Sale Date</th>
                <th>Sale Type</th>
                <th>Sale Product</th>
                <th>Sale Person</th>
                <th>Sale Customer</th>
                <th>Sale Amount</th>
                <th>Sale Commission</th>
                <th>Payment Type</th>
                <th>Payment Condition</th>
                <th>Payment Date</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {data.map((list) => (
                <tr key={list.created_at}>
                  <td>
                    {new Date(list.sale_date).toLocaleDateString("en-CA")}
                  </td>
                  <td>{list.sale_type}</td>
                  <td>{list.sale_product}</td>
                  <td>{list.sale_person}</td>
                  <td>{list.sale_customer}</td>
                  <td>
                    {isNaN(Number(list.sale_amount))
                      ? "N/A"
                      : `₹ ${Number(list.sale_amount).toFixed(2)}`}
                  </td>
                  <td>
                    {isNaN(Number(list.sale_commission))
                      ? "N/A"
                      : `₹ ${Number(list.sale_commission).toFixed(2)}`}
                  </td>
                  <td>{list.payment_type}</td>
                  <td>{list.payment_condition}</td>
                  <td>
                    {new Date(list.payment_date).toLocaleDateString("en-CA")}
                  </td>
                  <td>
                    {new Date(list.created_at).toLocaleDateString("en-CA")}
                  </td>
                  <td>
                    <Link to={`/updateSale/${list.sale_id}`}>
                      <button className="btn btn-success btn-sm m-1">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteSaleEntry(list.sale_id)}
                      className="btn btn-danger btn-sm m-1"
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
        <p className="text-center text-danger mt-3">No Sales History Found</p>
      )}
    </div>
  );
};

export default ViewSales;
