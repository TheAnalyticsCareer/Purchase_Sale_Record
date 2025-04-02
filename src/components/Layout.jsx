import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Layout() {
  let navigate = useNavigate();

  useEffect(() => {
    let department = localStorage.getItem("department");
    let token = localStorage.getItem("token");
    
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
