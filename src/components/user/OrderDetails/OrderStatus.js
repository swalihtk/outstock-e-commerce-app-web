import React, { useEffect, useState } from "react";

function OrderStatus({startStatus, endStatus}) {

  // state
  let [stateSame, setStateSame]=useState(false);
  let [styleClass, setStyleClass]=useState("");

  // mount
  useEffect(()=>{
    setStateSame(startStatus===endStatus);

    if(endStatus.state==="deliverd"){
      setStyleClass("orderStatus__deliverd")
    }else if(endStatus.state=="canceled"){
      setStyleClass("orderStatus__canceled");
    }else if(endStatus.state=="shipped"){
      setStyleClass("orderStatus__shipped")
    }else if(endStatus.state="packed"){
      setStyleClass("orderStatus__packed");
    }

  }, [startStatus, endStatus])

  return (
    <div className="orderStatus__main container">
      <h1>Order Status</h1>
      <div className="orderStatus__line">
        <div className="orderStatus__orderd"></div>
        <div className="orderStatus__details_left">
          <p>
            {startStatus.state}<br/> {startStatus.date?.substr(0,10)}
          </p>
        </div>
        <div className="orderStatus__line__main"></div>
        
        
        {!stateSame&&
        <>
        <div className={styleClass}></div>
        <div className="orderStatus__details_right">
          <p>
            {endStatus.state}<br/> {endStatus.date?.substr(0,10)}
        </p>
        </div>
        </>
        }
      </div>
    </div>
  );
}

export default OrderStatus;
