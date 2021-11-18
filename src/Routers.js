import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CategoryMain from "./components/admin/category/CategoryMain";
import ListUsersMain from "./components/admin/listUsers/ListUsersMain";
import AdminMain from "./components/admin/main/AdminMain";
import EditProduct from "./components/admin/product/EditProduct";
import ProductMain from "./components/admin/product/ProductMain";
import Home from "./components/common/home/Home";
import ProductDetails from "./components/common/productList/ProductDetails";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Register from "./components/user/Register";
import { isAdminLogedIn } from "./redux/admin/adminLoginReducer";
import { isUserLogedIn } from "./redux/user/logincheckReducer";

function Routers() {
  let { logedin } = useSelector((state) => state.userLogin);
  let adminLogedin = useSelector((state) => state.adminLogedin);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLogedIn());
    dispatch(isAdminLogedIn());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* User Routers */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={logedin ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={logedin ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/logout" element={<Logout />} />

        {/* Home routers */}
        <Route path="/productdetails/:prodId" element={<ProductDetails />} />

        {/* Admin Routers */}
        <Route path="/admin" element={<AdminMain />} />
        {adminLogedin.logedin && (
          <>
            <Route path="/admin/users" element={<ListUsersMain />} />
            <Route path="/admin/category" element={<CategoryMain />} />
            <Route path="/admin/product" element={<ProductMain />} />
            <Route path="/admin/product/edit/:id" element={<EditProduct />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
