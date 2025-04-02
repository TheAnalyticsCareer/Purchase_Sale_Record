import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const department = localStorage.getItem("department");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && department) {
      navigate(`/${department}`, { replace: true });
    } else {
      navigate("/userLogin", { replace: true });
    }
  }, [token, department, navigate]);

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