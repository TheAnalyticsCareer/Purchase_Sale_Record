// import { useContext, useState, useEffect } from "react";
// import { SearchContext } from "./SearchContext";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

// function Header() {
//   const navigate = useNavigate();
//   const [login, setLogin] = useState(null);
//   const { searchText, setSearchText, setTriggerSearch } =
//     useContext(SearchContext);
//   const email = localStorage.getItem("email");
//   // console.log("email in header----", email);
//   let department = localStorage.getItem("department");
  

//   const companyName = localStorage.getItem("companyName");
//   const token = localStorage.getItem("token");

//   const checkLogin = () => {
//     if (!token) {
//       setLogin(false);
//     } else {
//       setLogin(true);
//     }
//   };

//   const toggleLog = () => {
//     if (token) {
//       alert("logout--");
//       localStorage.clear();
//       navigate("/userLogin");
//       window.location.reload();
//     } else {
//       navigate("/userLogin");
//     }
//   };

//   useEffect(() => {
//     checkLogin();
//   }, [login]);

//   return (
//     <Navbar expand="lg" className="bg-dark navbar-dark">
//       <Container fluid>
//         <Navbar.Brand href="#" className="text-light">
//           Icon
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="me-auto my-2 my-lg-0 text-light" navbarScroll>
//             <Nav.Link
//              style={{
//               display:
//                 department === "admin"
//                   ? "block"
//                   : "none",
//             }}

//             href="/admin" className="text-light">
//               Admin
//             </Nav.Link>
//             <Nav.Link 
//              style={{
//               display:
//                 department === "admin" || department === "purchase"
//                   ? "block"
//                   : "none",
//             }}

//             href="/purchase" className="text-light">
//               Purchase Entry
//             </Nav.Link>
//             <Nav.Link
            
//             style={{
//               display:
//                 department === "admin" || department === "sales"
//                   ? "block"
//                   : "none",
//             }}

//             href="/sales" className="text-light">
//               Sale Entry
//             </Nav.Link>

//             <Nav.Link
//               style={{
//                 display:
//                   department === "admin" || department === "purchase"
//                     ? "block"
//                     : "none",
//               }}
//               onClick={() =>
//                 department === "purchase" || "admin"
//                   ? navigate(`/viewPurchaseHistory`)
//                   : navigate(`/`)
//               }
//               className="text-light"
//             >
//               Purchase History
//             </Nav.Link>
//             <Nav.Link
//               style={{
//                 display:
//                   department === "admin" || department === "sales"
//                     ? "block"
//                     : "none",
//               }}
//               onClick={() =>
//                 department === "sales" || "admin"
//                   ? navigate(`/viewSalesHistory`)
//                   : navigate(`/`)
//               }
//               className="text-light"
//             >
//               Sale History
//             </Nav.Link>

//             <NavDropdown title="User" id="navbarScrollingDropdown">
//               <NavDropdown.Item>Email: {email} </NavDropdown.Item>
//               <NavDropdown.Item>Department: {department}</NavDropdown.Item>
//               <NavDropdown.Item>Company: {companyName}</NavDropdown.Item>
//               <NavDropdown.Item href="/userSignUp">
//                 Create New Account
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item>
//                 <Button
//                   onClick={() => toggleLog()}
//                   className={login ? "btn btn-danger" : "btn btn-primary"}
//                 >
//                   {login ? "Logout" : "Login"}{" "}
//                 </Button>
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search..."
//               className="me-2"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//             <Button
//               variant="outline-light"
//               onClick={() => setTriggerSearch(true)}
//             >
//               Search
//             </Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;















import { useContext, useState, useEffect, useRef } from "react";
import { SearchContext } from "./SearchContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faUser, 
  faSignOutAlt, 
  faUserPlus, 
  faChevronDown,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const { searchText, setSearchText, setTriggerSearch } = useContext(SearchContext);
  const email = localStorage.getItem("email");
  let department = localStorage.getItem("department");
  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const getAvatarColor = (email) => {
    if (!email) return '#4e73df';
    const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];
    const hash = email.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  const checkLogin = () => {
    if (!token) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  const toggleLog = async () => {
    if (token) {
      if (!window.confirm("Are you sure you want to logout?")) return;

      try {
        await axios.put(`https://purchase-sale-logic.onrender.com/user/updateUserStatus/${companyName}/${userId}`);
      } catch (err) {
        console.log("error when logging out---", err);
      }

      localStorage.clear();
      sessionStorage.clear();
      navigate("/userLogin");
      window.location.reload();
    } else {
      navigate("/userLogin");
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // For user dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      // For mobile menu
      if (mobileMenuOpen && 
          !mobileMenuRef.current.contains(event.target) && 
          !hamburgerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    checkLogin();
  }, [login]);

  // Check if current route matches menu item
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close mobile menu when navigating
  const handleMobileNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-container">
          {/* Mobile Menu Button */}
          <button 
            ref={hamburgerRef}
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>

          {/* Logo/Brand Section */}
          <div className="brand-section" >
            <span className="company-name">{companyName || "InventoryPro"}</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="main-nav">
            <ul className="nav-list">
              <li 
                className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
                style={{ display: department === "admin" ? "flex" : "none" }}
                onClick={() => navigate("/admin")}
              >
                Dashboard
                <span className="nav-item-indicator"></span>
              </li>
              <li 
                className={`nav-item ${isActive('/adminView') ? 'active' : ''}`}
                style={{ display: department === "admin" ? "flex" : "none" }}
                onClick={() => navigate("/adminView")}
              >
                Users
                <span className="nav-item-indicator"></span>
              </li>
              <li 
                className={`nav-item ${isActive('/purchase') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "purchase" ? "flex" : "none" }}
                onClick={() => navigate("/purchase")}
              >
                Purchase Entry
                <span className="nav-item-indicator"></span>
              </li>
              <li 
                className={`nav-item ${isActive('/sales') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "sales" ? "flex" : "none" }}
                onClick={() => navigate("/sales")}
              >
                Sale Entry
                <span className="nav-item-indicator"></span>
              </li>
              <li 
                className={`nav-item ${isActive('/viewPurchaseHistory') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "purchase" ? "flex" : "none" }}
                onClick={() => navigate("/viewPurchaseHistory")}
              >
                Purchase History
                <span className="nav-item-indicator"></span>
              </li>
              <li 
                className={`nav-item ${isActive('/viewSalesHistory') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "sales" ? "flex" : "none" }}
                onClick={() => navigate("/viewSalesHistory")}
              >
                Sale History
                <span className="nav-item-indicator"></span>
              </li>
            </ul>
          </nav>

          {/* Utility Section */}
          <div className="utility-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setTriggerSearch(true)}
              />
              <button 
                className="search-button"
                onClick={() => setTriggerSearch(true)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            {email && (
              <div className="user-dropdown" ref={dropdownRef}>
                <div 
                  className="user-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="user-avatar" style={{ backgroundColor: getAvatarColor(email) }}>
                    {email[0].toUpperCase()}
                  </div>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} 
                  />
                </div>
                <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                  <div className="user-info">
                    <div className="user-email">{email}</div>
                    <div className="user-department">
                      {department.toUpperCase()[0] + department.slice(1)}
                    </div>
                    <div className="user-company">{companyName}</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/userSignUp");
                      setDropdownOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="item-icon" />
                    Create Account
                  </button>
                  <button 
                    className="dropdown-item logout"
                    onClick={() => {
                      toggleLog();
                      setDropdownOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={login ? faSignOutAlt : faUser} className="item-icon" />
                    {login ? "Logout" : "Login"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
          <div className="mobile-menu-content">
            <ul className="mobile-nav-list">
              <li 
                className={`mobile-nav-item ${isActive('/admin') ? 'active' : ''}`}
                style={{ display: department === "admin" ? "flex" : "none" }}
                onClick={() => handleMobileNavClick("/admin")}
              >
                Dashboard
              </li>
              <li 
                className={`mobile-nav-item ${isActive('/adminView') ? 'active' : ''}`}
                style={{ display: department === "admin" ? "flex" : "none" }}
                onClick={() => handleMobileNavClick("/adminView")}
              >
                Users
              </li>
              <li 
                className={`mobile-nav-item ${isActive('/purchase') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "purchase" ? "flex" : "none" }}
                onClick={() => handleMobileNavClick("/purchase")}
              >
                Purchase Entry
              </li>
              <li 
                className={`mobile-nav-item ${isActive('/sales') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "sales" ? "flex" : "none" }}
                onClick={() => handleMobileNavClick("/sales")}
              >
                Sale Entry
              </li>
              <li 
                className={`mobile-nav-item ${isActive('/viewPurchaseHistory') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "purchase" ? "flex" : "none" }}
                onClick={() => handleMobileNavClick("/viewPurchaseHistory")}
              >
                Purchase History
              </li>
              <li 
                className={`mobile-nav-item ${isActive('/viewSalesHistory') ? 'active' : ''}`}
                style={{ display: department === "admin" || department === "sales" ? "flex" : "none" }}
                onClick={() => handleMobileNavClick("/viewSalesHistory")}
              >
                Sale History
              </li>
            </ul>

            {email && (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar" style={{ backgroundColor: getAvatarColor(email) }}>
                  {email[0].toUpperCase()}
                </div>
                <div className="mobile-user-details">
                  <div className="mobile-user-email">{email}</div>
                  <div className="mobile-user-department">
                    {department.toUpperCase()[0] + department.slice(1)}
                  </div>
                </div>
                <button 
                  className="mobile-logout-button"
                  onClick={() => {
                    toggleLog();
                    setMobileMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="header-spacer"></div>
    </>
  );
}

export default Header;