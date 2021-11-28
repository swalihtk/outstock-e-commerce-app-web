import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderCard from "./OrderCard";
import orderHelper from "../../../actions/user/orderHelper";
import { useParams } from "react-router";

function AllOrders() {

  // hooks
  let {userId}=useParams();

  // states
  let [allOrders, setAllOrders]=useState([]);

  // lifecycle
  useEffect(()=>{
    orderHelper.getUserOrders(userId, setAllOrders);
  }, [])

  //console.log(allOrders);

  return (
    <div className="allOrders__main">
      <h1>All Orders</h1>

      <Container>
        {
          allOrders.map((item, key)=>{
            return <OrderCard key={item.orderDetails._id} userId={userId} orders={item.orderDetails} />
          })
        }
        
      </Container>
    </div>
  );
}

export default AllOrders;
