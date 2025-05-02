// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { SearchContext } from "../components/header/SearchContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faFilter, faChartLine, faReceipt } from '@fortawesome/free-solid-svg-icons';
// import "./ViewSales.css";

// const ViewSales = () => {
//   const [data, setData] = useState([]);
//   const today = new Date();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [date, setDate] = useState("");

//   const [saleType, setSaleType] = useState(null);
//   const [saleProduct, setSaleProduct] = useState(null);
//   const [salePerson, setSalePerson] = useState(null);
//   const [saleCustomer, setSaleCustomer] = useState(null);
//   const [createdAt, setCreatedAt] = useState(null);

//   const { searchText, triggerSearch, setTriggerSearch } = useContext(SearchContext);
//   const companyName = localStorage.getItem("companyName");
//   const token = localStorage.getItem("token");

//   // Fetch sales history
//   const getSalesHistory = async () => {
//     try {
//       setIsLoading(true);
//       if (!token) {
//         alert("You need to login to view sales history");
//         return;
//       }

//       let selectedMonth = month || today.getMonth() + 1;
//       let selectedYear = year || today.getFullYear();
//       let selectedDate = date;

//       let res;

//       if (saleType || saleProduct || salePerson || saleCustomer || createdAt) {
//         res = await axios.get(
//           `https://purchase-sale-logic.onrender.com/sales/filterSaleRecord/${companyName}/${
//             saleType ? saleType : "null"
//           }/${saleProduct ? saleProduct : "null"}/${
//             salePerson ? salePerson : "null"
//           }/${saleCustomer ? saleCustomer : "null"}/${
//             createdAt ? createdAt : "null"
//           }`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       } else if (selectedDate) {
//         res = await axios.get(
//           `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       } else {
//         res = await axios.get(
//           `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       }

//       setData(res?.data.result || []);
//     } catch (err) {
//       console.log("Error fetching sales history:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   //  ------------------search---------------------------------------------------

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




//   // Delete sale entry
//   const deleteSaleEntry = async (sale_id) => {
//     try {
//       if (!token) {
//         alert("You need to login to perform the delete action");
//         return;
//       }

//       const option = window.confirm("You are about to delete a sales entry");
//       if (!option) return;

//       await axios.delete(
//         `https://purchase-sale-logic.onrender.com/sales/deleteSalesRecord/${companyName}/${sale_id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Deleted Successfully");
//       getSalesHistory();
//     } catch (err) {
//       console.log("Error deleting sales entry:", err);
//       alert("Failed to delete entry. Please try again.");
//     }
//   };

//   // Event handlers for filters
//   const getSaleType = (e) => setSaleType(e.target.value);
//   const getSaleProduct = (e) => setSaleProduct(e.target.value);
//   const getSalePerson = (e) => setSalePerson(e.target.value);
//   const getSaleCustomer = (e) => setSaleCustomer(e.target.value);
//   const getCreatedAt = (e) => setCreatedAt(e.target.value);

//   const getDate = (e) => {
//     let inputDate = e.target.value;
//     if (inputDate < 1 || inputDate > 31) inputDate = "";
//     setDate(inputDate);
//   };

//   const getMonth = (e) => {
//     let inputMonth = e.target.value;
//     if (inputMonth < 1 || inputMonth > 12) inputMonth = today.getMonth() + 1;
//     setMonth(inputMonth);
//   };

//   const getYear = (e) => {
//     let inputYear = e.target.value;
//     if (inputYear.length > 4) inputYear = inputYear.slice(0, 4);
//     setYear(inputYear);
//   };

//   // Calculate totals
//   const totalSales = data.reduce((acc, item) => acc + Number(item.sale_amount || 0), 0);
//   const totalCommission = data.reduce((acc, item) => acc + Number(item.sale_commission || 0), 0);

//   // Fetch data on component mount
//   useEffect(() => {
//     getSalesHistory();
//   }, []);

//   useEffect(() => {
//         if (triggerSearch) {
//           search();
//           setTriggerSearch(false);
//         }
//       }, [triggerSearch]);

//   return (
//     <div className="sales-dashboard">
//       <div className="dashboard-header">
//         <div className="header-content">
//           <h1>
//             <FontAwesomeIcon icon={faChartLine} className="header-icon" />
//             Sales History
//           </h1>
//           <p>Track and analyze your company's revenue streams</p>
//         </div>
//         <div className="header-stats">
//           <div className="stat-card">
//             <span className="stat-label">Total Transactions</span>
//             <span className="stat-value">{data.length}</span>
//           </div>
//           <div className="stat-card accent">
//             <span className="stat-label">Total Sales</span>
//             <span className="stat-value">₹{totalSales.toFixed(2)}</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-label">Total Commission</span>
//             <span className="stat-value">₹{totalCommission.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>

//       <div className="dashboard-controls">
//         <div className="controls-top">
//           <button 
//             onClick={() => setShowFilters(!showFilters)} 
//             className="toggle-filters-btn"
//           >
//             <FontAwesomeIcon icon={faFilter} />
//             {showFilters ? ' Hide Filters' : ' Show Filters'}
//           </button>
//         </div>

//         {showFilters && (
//           <div className="filter-section">
//             <div className="filter-group">
//               <label>Date Range</label>
//               <div className="date-filters">
//                 <input
//                   type="number"
//                   min="1"
//                   max="31"
//                   onChange={getDate}
//                   placeholder="Day"
//                   className="filter-input"
//                 />
//                 <input
//                   type="number"
//                   min="1"
//                   max="12"
//                   onChange={getMonth}
//                   placeholder="Month"
//                   className="filter-input"
//                 />
//                 <input
//                   type="number"
//                   min="1900"
//                   max="2100"
//                   onChange={getYear}
//                   placeholder="Year"
//                   className="filter-input"
//                 />
//               </div>
//             </div>

//             <div className="filter-group">
//               <label>Transaction Details</label>
//               <div className="detail-filters">
//                 <input
//                   type="text"
//                   onChange={getSaleType}
//                   placeholder="Sale Type"
//                   className="filter-input"
//                 />
//                 <input
//                   type="text"
//                   onChange={getSaleProduct}
//                   placeholder="Product"
//                   className="filter-input"
//                 />
//                 <input
//                   type="text"
//                   onChange={getSalePerson}
//                   placeholder="Sales Person"
//                   className="filter-input"
//                 />
//                 <input
//                   type="text"
//                   onChange={getSaleCustomer}
//                   placeholder="Customer"
//                   className="filter-input"
//                 />
//               </div>
//             </div>

//             <div className="filter-group">
//               <label>Created At</label>
//               <input 
//                 type="date" 
//                 onChange={getCreatedAt} 
//                 className="filter-input"
//               />
//             </div>

//             <button 
//               onClick={getSalesHistory} 
//               className="apply-filters-btn"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Loading...' : 'Apply Filters'}
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="dashboard-content">
//         {isLoading ? (
//           <div className="loading-spinner">
//             <div className="spinner"></div>
//             <p>Loading sales records...</p>
//           </div>
//         ) : data?.length > 0 ? (
//           <>
//             <div className="table-wrapper">
//               <table className="transactions-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Date</th>
//                     <th>Type</th>
//                     <th>Product</th>
//                     <th>Person</th>
//                     <th>Customer</th>
//                     <th>Amount</th>
//                     <th>Commission</th>
//                     <th>Payment Type</th>
//                     <th>Payment Condition</th>
//                     <th>Payment Date</th>
//                     <th>Created</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.map((list, index) => (
//                     <tr key={list.sale_id}>
//                       <td>{index + 1}</td>
//                       <td>{new Date(list.sale_date).toLocaleDateString("en-CA")}</td>
//                       <td className="type-cell">
//                         <span className={`type-badge ${list.sale_type?.toLowerCase().replace(/\s+/g, '-')}`}>
//                           {list.sale_type}
//                         </span>
//                       </td>
//                       <td>{list.sale_product}</td>
//                       <td>{list.sale_person}</td>
//                       <td>{list.sale_customer}</td>
//                       <td className="amount-cell">₹{Number(list.sale_amount || 0).toFixed(2)}</td>
//                       <td className="commission-cell">₹{Number(list.sale_commission || 0).toFixed(2)}</td>
//                       <td>
//                         <span className={`payment-method ${list.payment_type?.toLowerCase()}`}>
//                           {list.payment_type}
//                         </span>
//                       </td>
//                       <td>{list.payment_condition}</td>
//                       <td>
//                         {list.payment_date ? new Date(list.payment_date).toLocaleDateString("en-CA") : '-'}
//                       </td>
//                       <td>
//                         {new Date(list.created_at).toLocaleDateString("en-CA")}
//                       </td>
//                       <td className="actions-cell">
//                         <Link to={`/updateSale/${list.sale_id}`} className="action-link">
//                           <button className="edit-btn">
//                             <FontAwesomeIcon icon={faEdit} />
//                           </button>
//                         </Link>
//                         <button
//                           onClick={() => deleteSaleEntry(list.sale_id)}
//                           className="delete-btn"
//                         >
//                           <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="table-footer">
//               <div className="pagination-info">
//                 Showing {data.length} of {data.length} records
//               </div>
//               <div className="summary-info">
//                 <div className="summary-item">
//                   <span>Total Sales:</span>
//                   <span className="summary-value">₹{totalSales.toFixed(2)}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>Avg. Sale:</span>
//                   <span className="summary-value">₹{(totalSales/data.length).toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="no-results">
//             <div className="no-results-icon">
//               <FontAwesomeIcon icon={faReceipt} />
//             </div>
//             <h3>No sales records found</h3>
//             <p>Try adjusting your filters or add new sales</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewSales;














import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../components/header/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFilter,
  faChartLine,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewSales.css";

const ViewSales = () => {
  const [data, setData] = useState([]);
  const today = new Date();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");

  const [saleType, setSaleType] = useState(null);
  const [saleProduct, setSaleProduct] = useState(null);
  const [salePerson, setSalePerson] = useState(null);
  const [saleCustomer, setSaleCustomer] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const { searchText, triggerSearch, setTriggerSearch } =
    useContext(SearchContext);
  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");

  // Fetch sales history
  const getSalesHistory = async () => {
    try {
      setIsLoading(true);
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
          `https://purchase-sale-logic.onrender.com/sales/filterSaleRecord/${companyName}/${
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
          `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.get(
          `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${selectedMonth}/${selectedYear}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setData(res?.data.result || []);
    } catch (err) {
      console.log("Error fetching sales history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  //  ------------------search---------------------------------------------------

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

  // Delete sale entry
  const deleteSaleEntry = async (sale_id) => {
    try {
      if (!token) {
        alert("You need to login to perform the delete action");
        return;
      }

      const option = window.confirm("You are about to delete a sales entry");
      if (!option) return;

      await axios.delete(
        `https://purchase-sale-logic.onrender.com/sales/deleteSalesRecord/${companyName}/${sale_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Deleted Successfully");
      getSalesHistory();
    } catch (err) {
      console.log("Error deleting sales entry:", err);
      alert("Failed to delete entry. Please try again.");
    }
  };

  // Event handlers for filters
  const getSaleType = (e) => setSaleType(e.target.value);
  const getSaleProduct = (e) => setSaleProduct(e.target.value);
  const getSalePerson = (e) => setSalePerson(e.target.value);
  const getSaleCustomer = (e) => setSaleCustomer(e.target.value);
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

  // Calculate totals
  const totalSales = data.reduce(
    (acc, item) => acc + Number(item.sale_amount || 0),
    0
  );
  const totalCommission = data.reduce(
    (acc, item) => acc + Number(item.sale_commission || 0),
    0
  );
  const quantityOrdered = data.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );
  const quantityDispatched = data.reduce(
    (acc, item) => acc + Number(item.quantityPicked || 0),
    0
  );
  const quantityLeft = data.reduce(
    (acc, item) => acc + Number(item.quantityLeftOver || 0),
    0
  );

  // Fetch data on component mount
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
    <div className="sales-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>
            <FontAwesomeIcon icon={faChartLine} className="header-icon" />
            Sales History
          </h1>
          <p>Track and analyze your company's revenue streams</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-label">Total Transactions</span>
            <span className="stat-value">{data.length}</span>
          </div>
          <div className="stat-card accent">
            <span className="stat-label">Total Sales</span>
            <span className="stat-value">₹{totalSales.toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Commission</span>
            <span className="stat-value">₹{totalCommission.toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Quantity Ordered</span>
            <span className="stat-value">₹{quantityOrdered.toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Quantity Dispatched</span>
            <span className="stat-value">₹{quantityDispatched.toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Quantity Left</span>
            <span className="stat-value">₹{quantityLeft.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="controls-top">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="toggle-filters-btn"
          >
            <FontAwesomeIcon icon={faFilter} />
            {showFilters ? " Hide Filters" : " Show Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="filter-section">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-filters">
                <input
                  type="number"
                  min="1"
                  max="31"
                  onChange={getDate}
                  placeholder="Day"
                  className="filter-input"
                />
                <input
                  type="number"
                  min="1"
                  max="12"
                  onChange={getMonth}
                  placeholder="Month"
                  className="filter-input"
                />
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  onChange={getYear}
                  placeholder="Year"
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Transaction Details</label>
              <div className="detail-filters">
                <input
                  type="text"
                  onChange={getSaleType}
                  placeholder="Sale Type"
                  className="filter-input"
                />
                <input
                  type="text"
                  onChange={getSaleProduct}
                  placeholder="Product"
                  className="filter-input"
                />
                <input
                  type="text"
                  onChange={getSalePerson}
                  placeholder="Sales Person"
                  className="filter-input"
                />
                <input
                  type="text"
                  onChange={getSaleCustomer}
                  placeholder="Customer"
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Created At</label>
              <input
                type="date"
                onChange={getCreatedAt}
                className="filter-input"
              />
            </div>

            <button
              onClick={getSalesHistory}
              className="apply-filters-btn"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Apply Filters"}
            </button>
          </div>
        )}
      </div>

      <div className="dashboard-content">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading sales records...</p>
          </div>
        ) : data?.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Quantity Picked</th>
                    <th>Quantity Left Over</th>
                    <th>Status</th>
                    <th>Person</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Commission</th>
                    <th>Payment Type</th>
                    <th>Payment Condition</th>
                    <th>Payment Date</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((list, index) => (
                    <tr key={list.sale_id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(list.sale_date).toLocaleDateString("en-CA")}
                      </td>
                      <td className="type-cell">
                        <span
                          className={`type-badge ${list.sale_type
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {list.sale_type}
                        </span>
                      </td>
                      <td>{list.sale_product}</td>
                      <td>{list.quantity} </td>
                      <td>{list.quantityPicked} </td>
                      <td>{list.quantityLeftOver} </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            list.status === "completed"
                              ? "bg-success"
                              : list.status === "processing"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {list.status}
                        </span>
                      </td>
                      <td>{list.sale_person}</td>
                      <td>{list.sale_customer}</td>
                      <td className="amount-cell">
                        ₹{Number(list.sale_amount || 0).toFixed(2)}
                      </td>
                      <td className="commission-cell">
                        ₹{Number(list.sale_commission || 0).toFixed(2)}
                      </td>
                      <td>
                        <span
                          className={`payment-method ${list.payment_type?.toLowerCase()}`}
                        >
                          {list.payment_type}
                        </span>
                      </td>
                      <td>{list.payment_condition}</td>
                      <td>
                        {list.payment_date
                          ? new Date(list.payment_date).toLocaleDateString(
                              "en-CA"
                            )
                          : "-"}
                      </td>
                      <td>
                        {new Date(list.created_at).toLocaleDateString("en-CA")}
                      </td>
                      <td className="actions-cell">
                        <Link
                          to={`/updateSale/${list.sale_id}`}
                          className="action-link"
                        >
                          <button className="edit-btn">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteSaleEntry(list.sale_id)}
                          className="delete-btn"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="pagination-info">
                Showing {data.length} of {data.length} records
              </div>
              <div className="summary-info">
                <div className="summary-item">
                  <span>Total Sales:</span>
                  <span className="summary-value">
                    ₹{totalSales.toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Avg. Sale:</span>
                  <span className="summary-value">
                    ₹{(totalSales / data.length).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <FontAwesomeIcon icon={faReceipt} />
            </div>
            <h3>No sales records found</h3>
            <p>Try adjusting your filters or add new sales</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSales;
