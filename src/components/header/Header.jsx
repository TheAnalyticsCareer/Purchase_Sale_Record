import { useContext, useState, useEffect } from "react";
import { SearchContext } from "./SearchContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(null);
  const { searchText, setSearchText, setTriggerSearch } =
    useContext(SearchContext);
  const email = localStorage.getItem("email");
  console.log("email in header----", email);
  let department = localStorage.getItem("department");
  // department=department.toLowerCase();

  const companyName = localStorage.getItem("companyName");
  const token = localStorage.getItem("token");

  const checkLogin = () => {
    if (!token) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  const toggleLog = () => {
    if (token) {
      alert("logout--");
      localStorage.clear();
      navigate("/userLogin");
      window.location.reload();
    } else {
      navigate("/userLogin");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [login]);

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container fluid>
        <Navbar.Brand href="#" className="text-light">
          Icon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 text-light" navbarScroll>
            <Nav.Link
             style={{
              display:
                department === "admin"
                  ? "block"
                  : "none",
            }}

            href="/admin" className="text-light">
              Admin
            </Nav.Link>
            <Nav.Link 
             style={{
              display:
                department === "admin" || department === "purchase"
                  ? "block"
                  : "none",
            }}

            href="/purchase" className="text-light">
              Purchase Entry
            </Nav.Link>
            <Nav.Link
            
            style={{
              display:
                department === "admin" || department === "sales"
                  ? "block"
                  : "none",
            }}

            href="/sales" className="text-light">
              Sale Entry
            </Nav.Link>

            <Nav.Link
              style={{
                display:
                  department === "admin" || department === "purchase"
                    ? "block"
                    : "none",
              }}
              onClick={() =>
                department === "purchase" || "admin"
                  ? navigate(`/viewPurchaseHistory`)
                  : navigate(`/`)
              }
              className="text-light"
            >
              Purchase History
            </Nav.Link>
            <Nav.Link
              style={{
                display:
                  department === "admin" || department === "sales"
                    ? "block"
                    : "none",
              }}
              onClick={() =>
                department === "sales" || "admin"
                  ? navigate(`/viewSalesHistory`)
                  : navigate(`/`)
              }
              className="text-light"
            >
              Sale History
            </Nav.Link>

            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item>Email:{email} </NavDropdown.Item>
              <NavDropdown.Item>Department: {department}</NavDropdown.Item>
              <NavDropdown.Item>Company: {companyName}</NavDropdown.Item>
              <NavDropdown.Item href="/userSignUp">
                Create New Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button
                  onClick={() => toggleLog()}
                  className={login ? "btn btn-danger" : "btn btn-primary"}
                >
                  {login ? "Logout" : "Login"}{" "}
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              variant="outline-light"
              onClick={() => setTriggerSearch(true)}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
