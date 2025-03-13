import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./components/header/SearchContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./components/Layout";
import UserSignUp from './components/user/UserSignUp';
import UserLogin from './components/user/UserLogin';
import PurchaseDept from './components/home/PurchaseDept';
import ViewPurchase from './home/ViewPurchase';
import UpdatePurchase from './home/UpdatePurchase';
import SaleDept from './components/home/SaleDept';
import ViewSales from './home/ViewSales';
import UpdateSale from './home/UpdateSale';
import AdminDept from './components/home/AdminDept';
import UpdateUser from './home/UpdateUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SearchProvider>
  <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="purchase" element={<PurchaseDept />} />
        <Route path="sales" element={<SaleDept />} />
        <Route path="admin" element={<AdminDept />} />


        <Route path="userSignUp"element={<UserSignUp/>}/>
        <Route path="userLogin"element={<UserLogin/>}/>
        <Route path="viewPurchaseHistory" element={<ViewPurchase/>}/>
        <Route path="viewSalesHistory" element={<ViewSales/>}/>

        <Route path="updatePurchase/:purchase_id" element={<UpdatePurchase/>}/>
        <Route path="updateSale/:sale_id" element={<UpdateSale/>}/>
        
        <Route path="updateUser/:user_id" element={<UpdateUser/>}/>

        </Route>
      </Routes>
    </Router>
    </SearchProvider>
);


