import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function OrderCard() {
  let navigate = useNavigate();

  // handle show detail page
  function handleShowDetailPage() {
    navigate("/order_details/94394u45989");
  }

  return (
    <div className="orderCard__main">
      <div className="orderCard__leftSide">
        <div className="orderCard__img">
          <img
            src="https://rukminim1.flixcart.com/image/224/224/ktx9si80/mobile/q/a/c/narzo-50a-rmx3430-realme-original-imag75kybaer8scz.jpeg?q=90"
            alt=""
          />
        </div>
        <div className="orderCard__productDetails">
          <h3>Samsung One</h3>
          <p>
            <strong>Color: </strong>Red
          </p>
          <p>
            <strong>Brand: </strong>Nike
          </p>
        </div>
      </div>

      <div className="orderCard__productPrice">
        <p>₹23,0000</p>
      </div>
      <div className="orderCard__status">
        <p style={{ background: "blue" }}>Orderd</p>
      </div>
      <div className="orderCard__action">
        <Button className="btn-secondary" onClick={handleShowDetailPage}>
          Show Details
        </Button>
      </div>
    </div>
  );
}

export default OrderCard;
