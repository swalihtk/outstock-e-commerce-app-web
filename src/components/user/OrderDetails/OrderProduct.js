import React from "react";

function OrderProduct() {
  return (
    <div className="orderProduct__main">
      <h1>Product Details</h1>
      <div className="orderProduct__container">
        <div className="orderProduct__img">
          <img
            src="https://rukminim1.flixcart.com/image/224/224/ktx9si80/mobile/q/a/c/narzo-50a-rmx3430-realme-original-imag75kybaer8scz.jpeg?q=90"
            alt=""
          />
        </div>
        <div className="orderProduct__details">
          <h1>Samsung One</h1>
          <p>
            <strong>Price: </strong>₹45,999
          </p>
          <p>
            <strong>Color: </strong>Red
          </p>
          <p>
            <strong>Quantity: </strong>1
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
