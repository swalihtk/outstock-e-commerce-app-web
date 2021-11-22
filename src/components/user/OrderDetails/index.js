import React from "react";
import { Container, Row } from "react-bootstrap";
import NavigationBar from "../../../layouts/user/NavigationBar";
import OrderAddress from "./OrderAddress";
import "./OrderDetails.css";
import OrderProduct from "./OrderProduct";
import OrderStatus from "./OrderStatus";

function index() {
  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <h1
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "2rem" }}
        >
          Order Details
        </h1>
        <Row>
          <div className="col-12">
            <OrderStatus />
          </div>
          <div className="col-md-6 col-12">
            <OrderAddress />
          </div>
          <div className="col-md-6 col-12">
            <OrderProduct />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default index;
