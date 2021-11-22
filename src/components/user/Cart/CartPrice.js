import React from "react";

function CartPrice() {
  return (
    <div className="cartPrice__main">
      <h1>PRICE DETAILS</h1>
      <hr />
      <div className="cartPrice__price">
        <p>Price (1 item)</p>
        <p>₹12,999</p>
      </div>
      <div className="cartPrice__discount">
        <p>Discount</p>
        <p>₹000</p>
      </div>
      <div className="cartPrice__delivery">
        <p>Delivery Charges</p>
        <p>FREE</p>
      </div>
      <hr />
      <div className="cartPrice__total">
        <h4>
          <strong>Total Amount</strong>
        </h4>
        <h4>
          <strong>₹45,999</strong>
        </h4>
      </div>
    </div>
  );
}

export default CartPrice;
