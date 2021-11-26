import React, { useEffect, useState } from "react";
import OrderStatus from "./OrderStatus";

function OrderAddress({orderDetails}) {

  // state
  let [address, setAddress]=useState({});
  let [beginStatus, setBeginStatus]=useState({});
  let [endStatus, setEndStatus]=useState({});

  // mount
  useEffect(()=>{
    if(!orderDetails) return;
    setAddress(orderDetails.address);

    if(!orderDetails.status) return;
    setBeginStatus(orderDetails.status[0])
    setEndStatus(orderDetails.status[orderDetails.status.length-1])
  }, [orderDetails])


  return (
    <div className="orderAddress__main">
      <div className="row">
      <div className="col-12 col-md-6">
      <h1>Billing Address</h1>
      <div className="orderAddress__details">
        <p>
          <strong>{address.FullName}</strong>
        </p>
        <p>{address.Address}</p>
        <p>
          <strong>Phone No. </strong>{address.Mobile}
        </p>
      </div>
      </div>
      <div className="col-12 col-md-6">
      <OrderStatus startStatus={beginStatus} endStatus={endStatus}/>
      </div>
      </div>
    </div>
  );
}

export default OrderAddress;
