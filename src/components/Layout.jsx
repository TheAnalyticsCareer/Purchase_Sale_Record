import { Outlet } from "react-router-dom";
import Header from "./header/Header"; 

function Layout() {
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
