import React from "react";

function OrderStatus() {
  return (
    <div className="orderStatus__main container">
      <h1>Order Status</h1>
      <div className="orderStatus__line">
        <div style={{ color: "blue" }}>
          Orderd ({JSON.stringify(new Date()).substr(0, 11)})
        </div>
        <div style={{ textAlign: "right" }}>
          Shipped ({JSON.stringify(new Date()).substr(0, 11)})
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
