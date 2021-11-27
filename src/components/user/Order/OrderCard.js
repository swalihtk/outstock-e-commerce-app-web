import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function OrderCard({orders, userId}) {

  // hooks
  let navigate = useNavigate();

  // state
  let [totalQuantity, setTotalQuantity]=useState(0);
  let [date, setDate]=useState("");
  let [status, setStatus]=useState({});
  let [statusStyle, setStatusStyle]=useState({});

  // mount
  useEffect(()=>{

    if(!orders.date) return;
    let orderdDate=orders.date;
    setDate(orderdDate);

    if(!orders.products) return;
    let items=orders.products;
    let total=0;
    items.forEach(item=>total+=item.quantity)
    setTotalQuantity(total);

    if(!orders.status) return;
    setStatus(orders.status[orders.status.length-1]);
    
  }, [orders])

  useEffect(()=>{

    if(!status) return;

    if(status.state==="confirmed"){
      setStatusStyle({background:"blue"})
    }else if(status.state==="canceled"){
      setStatusStyle({background:"red"}) 
    }else if(status.state==="packed"){
      setStatusStyle({background:"violet"})
    }else if(status.state==="shipped"){
      setStatusStyle({background:"lightgreen"})
    }else if(status.state==="deliverd"){
      setStatusStyle({background:"green"})
    }
  }, [status])

  // actions
  function handleShowDetailPage() {
    navigate(`/order_details?userId=${userId}&orderId=${orders._id}`);
  }


  return (
    <>
    <div className="orderCard__main">
      <div className="orderCard__leftSide">
        <div className="orderCard__img">
          <img
            src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=612x612&w=0&h=waK8qOHV2Fgz2ntEWHWBQtXpNDAQ_wdhd4tkTUz6tfE="
            alt=""
          />
        </div>
        <div className="orderCard__productDetails">
          {/* <h5>{orders._id}</h5> */}
          <p>
            <strong>Total Items: </strong>{totalQuantity}
          </p>
          <p>
            <strong>Payment Method: </strong>{orders.paymentMethod}
          </p>
          <p>
            <strong>Orderd Date: </strong>{date.substr(0,10)}
          </p>
        </div>
      </div>

      <div className="orderCard__productPrice">
        <p>₹{orders.totalPrice}</p>
      </div>
      <div className="orderCard__status">
        <p style={statusStyle}>{status.state}</p>
      </div>
      <div className="orderCard__action">
        <Button className="btn-secondary" onClick={handleShowDetailPage}>
          Show Details
        </Button>
      </div>
    </div>
    <hr/>
    </>
  );
}

export default OrderCard;
