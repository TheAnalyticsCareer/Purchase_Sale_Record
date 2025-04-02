import { Outlet } from "react-router-dom";
import Header from "./header/Header"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Layout() {
  
  let navigate=useNavigate();
  let department = localStorage.getItem("department");

useEffect(()=>{
  navigate(`/${department}`)
},[])

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
