

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { SearchContext } from "../components/header/SearchContext";

// const ViewSales = () => {
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [date, setDate]=useState("")

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
//       let selectedDate=date ;

//       console.log("Fetching for Month:", selectedMonth);
//       console.log("Fetching for Year:", selectedYear);
//       console.log("Fetching for date:", selectedDate);

//       if(date===""){
//         const res = await axios.get(
//           `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
  
//         setData(res?.data.result);
//       }

//       // ----------------------------------------------------------------

//       const res = await axios.get(
//         `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
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



//     // ------------get date-------------------------


//     const getDate = (e) => {
//       let inputDate = e.target.value;
//       if (inputDate < 1 || inputDate > 31) {
//         inputDate = ""; 
//       }
//       setDate(inputDate);
//     };
  


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
//         <h3 className="mb-3">Sales History</h3>
//         <div className="d-flex justify-content-center gap-3 mb-3">

//         <input
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
  const [date, setDate] = useState("");

  const [saleType, setsaleType] = useState(null);
  const [saleProduct, setsaleProduct] = useState(null);
  const [salePerson, setsalePerson] = useState(null);
  const [saleCustomer, setsaleCustomer] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const today = new Date();
  const [data, setData] = useState("");
  const { searchText, triggerSearch, setTriggerSearch } =
    useContext(SearchContext);

  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");

  const getSalesHistory = async () => {
    try {
      if (!token) {
        alert("You need to login to view sales history");
        return;
      }

      let selectedMonth = month || today.getMonth() + 1;
      let selectedYear = year || today.getFullYear();
      let selectedDate = date;

      let res;

      if (saleType || saleProduct || salePerson || saleCustomer || createdAt) {
        res = await axios.get(
          `http://localhost:5000/sales/filterSaleRecord/${companyName}/${
            saleType ? saleType : "null"
          }/${saleProduct ? saleProduct : "null"}/${
            salePerson ? salePerson : "null"
          }/${saleCustomer ? saleCustomer : "null"}/${
            createdAt ? createdAt : "null"
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (selectedDate) {
        res = await axios.get(
          `http://localhost:5000/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.get(
          `http://localhost:5000/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}`,
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

  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/sales/searchSalesRecord/${companyName}/${searchText}`,
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
        `http://localhost:5000/sales/deleteSalesRecord/${companyName}/${sale_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Deleted Successfully");
      getSalesHistory();
    } catch (err) {
      console.log("Error deleting sale entry:", err);
      alert("Failed to delete entry. Please try again.");
    }
  };

  const getSaleType = (e) => {
    setsaleType(e.target.value);
  };

  const getSaleProduct = (e) => {
    setsaleProduct(e.target.value);
  };

  const getSalePerson = (e) => {
    setsalePerson(e.target.value);
  };

  const getSaleCustomer = (e) => {
    setsaleCustomer(e.target.value);
  };

  const getCreatedAt = (e) => {
    setCreatedAt(e.target.value);
  };

  const getDate = (e) => {
    let inputDate = e.target.value;
    if (inputDate < 1 || inputDate > 31) {
      inputDate = "";
    }
    setDate(inputDate);
  };

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
      <div className="card shadow-lg p-4 mb-5 bg-white rounded">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Sales History</h3>
          <div className="row g-3 mb-4">
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getSaleType}
                placeholder="Sale Type"
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getSaleProduct}
                placeholder="Sale Product"
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getSalePerson}
                placeholder="Sale Person"
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                onChange={getSaleCustomer}
                placeholder="Sale Customer"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                min="1"
                max="31"
                step="1"
                className="form-control"
                onChange={getDate}
                placeholder="Sale Date"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                min="1"
                max="12"
                step="1"
                className="form-control"
                onChange={getMonth}
                placeholder="Sale Month"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                min="1900"
                max="2100"
                step="1"
                className="form-control"
                onChange={getYear}
                placeholder="Sale Year"
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
                onClick={getSalesHistory}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {data?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
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
            <tbody>
              {data.map((list) => (
                <tr key={list.sale_id}>
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