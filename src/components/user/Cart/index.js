import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavigationBar from "../../../layouts/user/NavigationBar";
import { isUserLogedIn } from "../../../redux/user/logincheckReducer";
import "./cart.css";
import CartItems from "./CartItems";
import CartPrice from "./CartPrice";

function index() {
  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <div className="row">
          <div className="col-md-8 col-12">
            <CartItems />
          </div>
          <div className="col-md-4 col-12">
            <CartPrice />
          </div>
        </div>
      </Container>
    </>
  );
}

export default index;
