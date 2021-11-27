import React, { useEffect, useState } from "react";

function OrderStatus({ startStatus, endStatus }) {
  // state
  let [stateSame, setStateSame] = useState(false);
  let [styleClass, setStyleClass] = useState("");

  // mount
  useEffect(() => {
    setStateSame(startStatus === endStatus);

    if (endStatus.state === "deliverd") {
      setStyleClass("orderStatus__deliverd");
    } else if (endStatus.state == "canceled") {
      setStyleClass("orderStatus__canceled");
    } else if (endStatus.state == "shipped") {
      setStyleClass("orderStatus__shipped");
    } else if ((endStatus.state = "packed")) {
      setStyleClass("orderStatus__packed");
    }
  }, [startStatus, endStatus]);

  return (
    <div className="orderStatus__main container">
      <h1>Order Status</h1>
      <div className="orderStatus__container">
      <div class="progress-track">
        <ul id="progressbar">
            <li class="step0 active " id="step1">Ordered</li>
            <li class="step0 text-center" id="step2">Shipped</li>
            <li class="step0 text-right" id="step3">On the way</li>
            <li class="step0 text-right" id="step4">Delivered</li>
        </ul>
    </div>
      </div>
    </div>
  );
}

export default OrderStatus;
