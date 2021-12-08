import React from "react";
import NavigationBar from "../../../layouts/user/NavigationBar";
import Login from "../Login";
import AllOrders from "./AllOrders";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";

function Index() {
  let { logedin } = useSelector((state) => state.userLogin);

  if(!logedin) return <Login />

  return (
    <>
      <NavigationBar iconShow={true} />
      <AllOrders />
    </>
  );
}

export default Index;
