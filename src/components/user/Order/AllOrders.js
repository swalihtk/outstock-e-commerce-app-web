import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import OrderCard from "./OrderCard";
import orderHelper from "../../../actions/user/orderHelper";
import { useParams } from "react-router";

function AllOrders() {
  // hooks
  let { userId } = useParams();

  // states
  let [allOrders, setAllOrders] = useState([]);
  let [orderLoading, setOrderLoading]=useState(false);

  // lifecycle
  useEffect(() => {
    orderHelper.getUserOrders(userId, setAllOrders, setOrderLoading);
  }, []);

  //console.log(allOrders);
  

  return (
    <div className="allOrders__main" style={{ minHeight: "75vh" }}>
      <h1>All Orders</h1>

      {orderLoading ? (
        <div style={{display:"grid", placeItems:"center", height:"30vh"}}>
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <Container>
          {allOrders.map((item, key) => {
            return (
              <OrderCard
                key={item.orderDetails._id}
                userId={userId}
                orders={item.orderDetails}
              />
            );
          })}
        </Container>
      )}
    </div>
  );
}

export default AllOrders;
