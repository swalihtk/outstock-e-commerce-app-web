import React from "react";
import { Container, Row } from "react-bootstrap";
import NavigationBar from "../../../layouts/user/NavigationBar";
import Address from "./Address";
import "./checkout.css";
import OrderDetails from "./OrderDetails";

function index() {
  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <Row>
          <div className="col-md-6 col-12">
            <Address />
          </div>
          <div className="col-md-6 col-12">
            <OrderDetails />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default index;
