import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../components/header/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFilter,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewPurchase.css";



const ViewPurchase = () => {
  const [data, setData] = useState([]);
  const today = new Date();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
      setIsLoading(true);
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
          `https://purchase-sale-logic.onrender.com/purchase/filterPurchaseRecord/${companyName}/${
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
          `https://purchase-sale-logic.onrender.com/purchase/viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}/${selectedDate}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.get(
          `https://purchase-sale-logic.onrender.com/purchase/viewPurchaseRecord/${companyName}/${selectedMonth}/${selectedYear}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setData(res?.data.result || []);
    } catch (err) {
      console.log("Error fetching purchase history:", err);
    } finally {
      setIsLoading(false);
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

  // Calculate totals
  const totalAmount = data.reduce(
    (acc, item) => acc + Number(item.purchase_amount || 0),
    0
  );
  const totalCommission = data.reduce(
    (acc, item) => acc + Number(item.purchase_commission || 0),
    0
  );

  // Fetch data on component mount
  useEffect(() => {
    getPurchaseHistory();
  }, []);

  //--------------------------------------------------------------------

  useEffect(() => {
    if (triggerSearch) {
      search();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  //  -------------------------------------------------------------------------

  return (
    <div className="purchase-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>
            <FontAwesomeIcon icon={faShoppingCart} className="header-icon" />
            Purchase History
          </h1>
          <p>Track and analyze your company's financial transactions</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-label">Total Purchases</span>
            <span className="stat-value">{data.length}</span>
          </div>
          <div className="stat-card accent">
            <span className="stat-label">Total Amount</span>
            <span className="stat-value">₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Commission</span>
            <span className="stat-value">₹{totalCommission.toFixed(2)}</span>
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
                  onChange={getPurchaseType}
                  placeholder="Type"
                  className="filter-input"
                />
                <input
                  type="text"
                  onChange={getPurchaseProduct}
                  placeholder="Product"
                  className="filter-input"
                />
                <input
                  type="text"
                  onChange={getPurchasePerson}
                  placeholder="Person"
                  className="filter-input"
                />
                <input
                  type="text"
                  onChange={getPurchaseSupplier}
                  placeholder="Supplier"
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
              onClick={getPurchaseHistory}
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
            <p>Loading purchase records...</p>
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
                    <th>Person</th>
                    <th>Supplier</th>
                    <th>Amount</th>
                    <th>Commission</th>
                    <th>Payment Type</th>
                    <th>Payment Condition</th>
                    <th>Payment Date</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((list, index) => (
                    <tr key={list.purchase_id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(list.purchase_date).toLocaleDateString(
                          "en-CA"
                        )}
                      </td>
                      <td className="type-cell">
                        <span
                          className={`type-badge ${list.purchase_type
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {list.purchase_type}
                        </span>
                      </td>
                      <td>{list.purchase_product}</td>
                      <td>{list.purchase_person}</td>
                      <td>{list.purchase_supplier}</td>
                      <td className="amount-cell">
                        ₹{Number(list.purchase_amount || 0).toFixed(2)}
                      </td>
                      <td className="commission-cell">
                        ₹{Number(list.purchase_commission || 0).toFixed(2)}
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
                          to={`/updatePurchase/${list.purchase_id}`}
                          className="action-link"
                        >
                          <button className="edit-btn">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </Link>
                        <button
                          onClick={() => deletePurchaseEntry(list.purchase_id)}
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
                  <span>Total Amount:</span>
                  <span className="summary-value">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Avg. Purchase:</span>
                  <span className="summary-value">
                    ₹{(totalAmount / data.length).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <h3>No purchase records found</h3>
            <p>Try adjusting your filters or add new purchases</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPurchase;
