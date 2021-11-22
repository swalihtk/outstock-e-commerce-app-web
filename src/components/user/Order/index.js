import React from "react";
import NavigationBar from "../../../layouts/user/NavigationBar";
import AllOrders from "./AllOrders";
import "./order.css";

function index() {
  return (
    <>
      <NavigationBar iconShow={true} />
      <AllOrders />
    </>
  );
}

export default index;
