import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Layout() {
  useEffect(() => {
    let navigate = useNavigate();
    let department = localStorage.getItem("department");
    let token = localStorage.getItem("token");
    alert("navigating to department");
    if (token) {
      navigate(`/${department}`);
    }

    navigate(`/userLogin`);
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
