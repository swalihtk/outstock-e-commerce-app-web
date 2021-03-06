import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CategoryMain from "./components/admin/category/CategoryMain";
import ListUsersMain from "./components/admin/listUsers/ListUsersMain";
import AdminMain from "./components/admin/main/AdminMain";
import EditProduct from "./components/admin/product/EditProduct";
import ProductMain from "./components/admin/product/ProductMain";
import Home from "./components/common/home/Home";
import ProductDetails from "./components/common/productList/ProductDetails";
import ProductListMain from "./components/common/productPage/ProductListMain";
import SearchMain from "./components/common/search/SearchMain";
import SubCategoryListMain from "./components/common/SubCatList/ProductListMain";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Register from "./components/user/Register";
import { isAdminLogedIn } from "./redux/admin/adminLoginReducer";
import { isUserLogedIn } from "./redux/user/logincheckReducer";
import Cart from "./components/user/Cart/index";
import Checkout from "./components/user/Checkout/index";
import OrderSuccess from "./components/user/Success/index";
import Order from "./components/user/Order/index";
import OrderDetails from "./components/user/OrderDetails/index";
import AdminBanners from "./components/admin/Banner/index";
import AdminOrders from "./components/admin/Orders/index";
import Profile from "./components/user/Profile/index";
import OfferAndCoupon from "./components/admin/Offer_Coupon";
import AdminSalesReport from "./components/admin/SalesReport";
import AdminSettings from "./components/admin/Settings/index";
import Wallet from "./components/user/Wallet/index";

function Routers() {
  let { logedin } = useSelector((state) => state.userLogin);
  let adminLogedin = useSelector((state) => state.adminLogedin);
  let dispatch = useDispatch();

  useEffect(async () => {
    dispatch(isUserLogedIn());
    dispatch(isAdminLogedIn());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* User Routers */}
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route path="/cart/checkout/:userId" element={<Checkout />} />
        <Route path="/orders/success/:userId" element={<OrderSuccess />} />
        <Route path="/orders/:userId" element={ <Order />} />
        <Route path="/order_details" element={ <OrderDetails /> } />
        {/* <Route path="/wallet" element={ <Wallet /> } /> */}
        <Route path="/profile" element={<Profile />} />
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
        <Route path="/category/:category" element={<ProductListMain />} />
        <Route path="/subcategory" element={<SubCategoryListMain />} />
        <Route path="/search" element={<SearchMain />} />

        {/* Admin Routers */}
        <Route path="/admin" element={<AdminMain />} />
        {adminLogedin.logedin && (
          <>
            <Route path="/admin/users" element={<ListUsersMain />} />
            <Route path="/admin/category" element={<CategoryMain />} />
            <Route path="/admin/product" element={<ProductMain />} />
            <Route path="/admin/product/edit/:id" element={<EditProduct />} />
            <Route path="/admin/banners" element={<AdminBanners />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/offers_coupons" element={<OfferAndCoupon />}/>
            <Route path="/admin/sales_report" element={<AdminSalesReport/>} />
            <Route path="/admin/settings" element={<AdminSettings/>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
