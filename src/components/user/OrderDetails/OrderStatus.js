import React, { useEffect, useState } from "react";

function OrderStatus({status, handleOrderCancel }) {
  // state
  let [stateSame, setStateSame] = useState(false);
  let [styleClass, setStyleClass] = useState("");


  return (
    <div className="orderStatus__main container">
      <h1>Order Status</h1>
      <div className="orderStatus__container">
      <div className="progress-track">
        <ul id="progressbar">
          {
            status.map((item, index)=>{
              let date="";
              if(item.date){
                date=item.date;
              }
                return <li className="step0 active" key={index} id={`step${index+1}`}>{item.state}<br/>{date.substr(0,10)}</li>
            })
          }
            
            {/* <li class="step0 text-center" id="step2">Shipped</li>
            <li class="step0 text-right" id="step3">On the way</li>
            <li class="step0 text-right" id="step4">Delivered</li> */}
        </ul>
    </div>
    <div className="orderStatus__cancel">
          <button onClick={handleOrderCancel}>CANCEL ORDER</button>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
