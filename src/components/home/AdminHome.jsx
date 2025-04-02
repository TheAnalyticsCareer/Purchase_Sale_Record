


import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faShoppingCart,
  faChartLine,
  faUserClock,
  faUserSlash,
  faCalendarAlt,
  faSearch,
  faSyncAlt,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";

// Helper function to generate consistent colors from strings
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'
  ];
  return colors[Math.abs(hash) % colors.length];
};

const AdminHome = () => {
  const [userData, setUserData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);

  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];

  const getAllUsers = async () => {
    if(!token) {
      alert("You need to login as admin to view the page");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/user/viewUsers/${companyName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(res?.data.result);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getPurchaseData = async () => {
    if (!token) {
      alert("You need to login to view purchase history");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/purchase/viewPurchaseRecord/${companyName}/${month}/${year}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPurchaseData(res?.data.result || []);
    } catch (err) {
      console.log("Purchase error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSaleData = async () => {
    if (!token) {
      alert("You need to login to view sale history");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://purchase-sale-logic.onrender.com/sales/viewSalesRecord/${companyName}/${month}/${year}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaleData(res?.data.result || []);
    } catch (err) {
      console.log("Sales error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllData();
  };

  const getAllData = () => {
    getPurchaseData();
    getSaleData();
    getAllUsers();
  };

  useEffect(() => {
    getAllData();
  }, []);

  // Calculate metrics
  const totalPurchaseAmount = purchaseData.reduce((sum, item) => sum + (Number(item.purchase_amount) || 0), 0);
  const totalPurchaseCommission = purchaseData.reduce((sum, item) => sum + (Number(item.purchase_commission) || 0), 0);
  const totalSaleAmount = saleData.reduce((sum, item) => sum + (Number(item.sale_amount) || 0), 0);
  const totalSaleCommission = saleData.reduce((sum, item) => sum + (Number(item.sale_commission) || 0), 0);
  const onlineUsers = userData.filter(user => user.userStatus === "online");
  const offlineUsers = userData.filter(user => user.userStatus === "offline");

  return (
    <div style={styles.dashboard}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>
            <FontAwesomeIcon icon={faBuilding} style={styles.headerIcon} />
            Business Dashboard
          </h1>
          <p style={styles.headerSubtitle}>Overview of your company performance</p>
        </div>
      </div>

      {/* Filter Controls */}
      <div style={styles.controlsContainer}>
        <form onSubmit={handleSubmit} style={styles.filterForm}>
          <div style={styles.filterGroup}>
            <FontAwesomeIcon icon={faCalendarAlt} style={styles.filterIcon} />
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              style={styles.filterSelect}
            >
              {monthNames.map((name, index) => (
                <option key={index} value={index + 1}>{name}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <FontAwesomeIcon icon={faCalendarAlt} style={styles.filterIcon} />
            <input
              type="number"
              min="1900"
              max="2100"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              placeholder="Year"
              style={styles.filterInput}
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.filterButton}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faSearch} />
            {isLoading ? "Loading..." : "Apply"}
          </button>

          
        </form>
      </div>

      {/* Metrics Grid */}
      <div style={styles.metricsGrid}>
        {/* Purchase Metrics Card */}
        <div style={styles.purchaseCard}>
          <div style={styles.cardHeader}>
            <div style={{...styles.cardIcon, background: 'rgba(106, 17, 203, 0.1)'}}>
              <FontAwesomeIcon icon={faShoppingCart} style={{color: '#6a11cb'}} />
            </div>
            <h3 style={styles.cardTitle}>Purchases</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Transactions</span>
              <span style={styles.metricValue}>{purchaseData.length}</span>
            </div>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Total Amount</span>
              <span style={styles.metricValue}>₹{totalPurchaseAmount.toFixed(2)}</span>
            </div>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Commission</span>
              <span style={styles.metricValue}>₹{totalPurchaseCommission.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sales Metrics Card */}
        <div style={styles.salesCard}>
          <div style={styles.cardHeader}>
            <div style={{...styles.cardIcon, background: 'rgba(37, 117, 252, 0.1)'}}>
              <FontAwesomeIcon icon={faChartLine} style={{color: '#2575fc'}} />
            </div>
            <h3 style={styles.cardTitle}>Sales</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Transactions</span>
              <span style={styles.metricValue}>{saleData.length}</span>
            </div>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Total Amount</span>
              <span style={styles.metricValue}>₹{totalSaleAmount.toFixed(2)}</span>
            </div>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Commission</span>
              <span style={styles.metricValue}>₹{totalSaleCommission.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* User Metrics Card */}
        <div style={styles.usersCard}>
          <div style={styles.cardHeader}>
            <div style={{...styles.cardIcon, background: 'rgba(40, 167, 69, 0.1)'}}>
              <FontAwesomeIcon icon={faUsers} style={{color: '#28a745'}} />
            </div>
            <h3 style={styles.cardTitle}>Users</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Total</span>
              <span style={styles.metricValue}>{userData.length}</span>
            </div>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Active Now</span>
              <span style={{...styles.metricValue, color: '#28a745'}}>{onlineUsers.length}</span>
            </div>
            <div style={styles.metricRow}>
              <span style={styles.metricLabel}>Offline</span>
              <span style={styles.metricValue}>{offlineUsers.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Status Sections */}
      <div style={styles.userSections}>
        {/* Online Users Section */}
        <div style={{...styles.userSection, borderTop: '4px solid #4cc9f0'}}>
          <div style={styles.sectionHeader}>
            <FontAwesomeIcon icon={faUserClock} style={{...styles.sectionIcon, color: '#4cc9f0'}} />
            <h3 style={{...styles.sectionTitle, color: '#4cc9f0'}}>Active Users</h3>
            <span style={{...styles.countBadge, background: 'rgba(76, 201, 240, 0.1)', color: '#4cc9f0'}}>
              {onlineUsers.length}
            </span>
          </div>
          <div style={styles.userList}>
            {onlineUsers.length > 0 ? (
              onlineUsers.map((user, index) => {
                const avatarColor = stringToColor(user.email);
                return (
                  <div key={index} style={styles.userCard}>
                    <div style={{...styles.userAvatar, 
                                background: avatarColor, 
                                color: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.userInfo}>
                      <h4 style={styles.userName}>{user.fullName}</h4>
                      <p style={{...styles.userDepartment, color: '#4cc9f0'}}>
                        {user.department}
                      </p>
                    </div>
                    <div style={{...styles.statusIndicator, 
                                background: '#4cc9f0',
                                boxShadow: '0 0 0 3px rgba(76, 201, 240, 0.2)'}}></div>
                  </div>
                );
              })
            ) : (
              <div style={styles.emptyState}>No active users at the moment</div>
            )}
          </div>
        </div>

        {/* Offline Users Section */}
        <div style={{...styles.userSection, borderTop: '4px solid #9e9e9e'}}>
          <div style={styles.sectionHeader}>
            <FontAwesomeIcon icon={faUserSlash} style={{...styles.sectionIcon, color: '#9e9e9e'}} />
            <h3 style={{...styles.sectionTitle, color: '#9e9e9e'}}>Offline Users</h3>
            <span style={{...styles.countBadge, background: 'rgba(158, 158, 158, 0.1)', color: '#9e9e9e'}}>
              {offlineUsers.length}
            </span>
          </div>
          <div style={styles.userList}>
            {offlineUsers.length > 0 ? (
              offlineUsers.map((user, index) => {
                const avatarColor = stringToColor(user.email);
                return (
                  <div key={index} style={styles.userCard}>
                    <div style={{...styles.userAvatar, 
                                background: avatarColor, 
                                color: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.userInfo}>
                      <h4 style={styles.userName}>{user.fullName}</h4>
                      <p style={{...styles.userDepartment, color: '#9e9e9e'}}>
                        {user.department}
                      </p>
                      <span style={{...styles.lastSeen, color: '#bdbdbd'}}>
                        Last seen: {user.lastOnline || 'N/A'}
                      </span>
                    </div>
                    <div style={{...styles.statusIndicator, 
                                background: '#9e9e9e',
                                boxShadow: '0 0 0 3px rgba(158, 158, 158, 0.2)'}}></div>
                  </div>
                );
              })
            ) : (
              <div style={styles.emptyState}>All users are currently active</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles object
const styles = {
  dashboard: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '24px',
    color: '#212529'
  },
  header: {
    background: 'linear-gradient(135deg, #2c3e50 0%, #4a6491 100%)',
    color: 'white',
    padding: '25px 30px',
    borderRadius: '12px',
    marginBottom: '25px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  headerTitle: {
    margin: '0',
    fontSize: '28px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
  },
  headerIcon: {
    marginRight: '12px',
    fontSize: '24px'
  },
  headerSubtitle: {
    margin: '5px 0 0',
    opacity: '0.9',
    fontSize: '14px'
  },
  controlsContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px 20px',
    marginBottom: '25px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  filterForm: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    background: '#f8f9fa',
    borderRadius: '8px',
    padding: '8px 12px',
    border: '1px solid #e2e8f0'
  },
  filterIcon: {
    color: '#6c757d',
    marginRight: '8px',
    fontSize: '16px'
  },
  filterSelect: {
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
    color: '#495057',
    outline: 'none',
    minWidth: '120px'
  },
  filterInput: {
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
    color: '#495057',
    outline: 'none',
    width: '80px'
  },
  filterButton: {
    background: '#2c3e50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#1a2636'
    },
    '&:disabled': {
      background: '#adb5bd',
      cursor: 'not-allowed'
    }
  },
  
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '25px'
  },
  purchaseCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,240,255,1) 100%)',
    borderLeft: '4px solid #6a11cb'
  },
  salesCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,245,255,1) 100%)',
    borderLeft: '4px solid #2575fc'
  },
  usersCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,255,245,1) 100%)',
    borderLeft: '4px solid #28a745'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    gap: '12px'
  },
  cardIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  },
  cardTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#212529'
  },
  cardBody: {
    padding: '0 5px'
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px'
  },
  metricLabel: {
    color: '#6c757d'
  },
  metricValue: {
    fontWeight: '600',
    color: '#212529'
  },
  userSections: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  userSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    gap: '10px'
  },
  sectionIcon: {
    fontSize: '20px'
  },
  sectionTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '600',
    marginRight: 'auto'
  },
  countBadge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '9999px'
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
    flexShrink: '0'
  },
  userInfo: {
    flex: '1',
    minWidth: '0',
    marginLeft: '12px'
  },
  userName: {
    margin: '0',
    fontSize: '15px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#212529'
  },
  userDepartment: {
    margin: '4px 0 0',
    fontSize: '13px'
  },
  lastSeen: {
    fontSize: '12px',
    marginTop: '4px',
    color: '#6c757d'
  },
  statusIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: '0'
  },
  emptyState: {
    color: '#adb5bd',
    fontSize: '14px',
    textAlign: 'center',
    padding: '20px 0'
  }
};

export default AdminHome;