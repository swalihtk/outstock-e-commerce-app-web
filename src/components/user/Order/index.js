import React from "react";
import NavigationBar from "../../../layouts/user/NavigationBar";
import AllOrders from "./AllOrders";
import "./order.css";

function Index() {
  return (
    <>
      <NavigationBar iconShow={true} />
      <AllOrders />
    </>
  );
}

export default Index;
