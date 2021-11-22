import React from "react";
import { Container } from "react-bootstrap";
import OrderCard from "./OrderCard";

function AllOrders() {
  return (
    <div className="allOrders__main">
      <h1>All Orders</h1>

      <Container>
        <OrderCard />
      </Container>
    </div>
  );
}

export default AllOrders;
