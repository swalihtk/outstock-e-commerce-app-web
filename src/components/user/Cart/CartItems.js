import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useNavigate } from "react-router";

function CartItems() {
  let navigate = useNavigate();

  function handlerPlaceOrder() {
    navigate("/cart/checkout");
  }

  return (
    <div className="cartItems__main">
      <h1>My Cart (1)</h1>
      <hr />
      <div className="cartItems__container">
        {/* Cartitems product */}
        <div className="cartItems__productMain">
          <div className="cartItems__product">
            <div className="cartItems__product_img">
              <img
                src="https://rukminim1.flixcart.com/image/224/224/ktx9si80/mobile/q/a/c/narzo-50a-rmx3430-realme-original-imag75kybaer8scz.jpeg?q=90"
                alt=""
              />
            </div>
            <div className="cartItems__product_details">
              <h1>Realme Narzo 50A (Oxygen Green, 64 GB)</h1>
              <p>₹45,007</p>
              <div className="cartItems__count">
                <RemoveIcon />
                <p>1</p>
                <AddIcon />
              </div>
            </div>
            <div className="cartItems__product_delivery">
              <h4>Delivery in 2 days</h4>
              <p>7 days replacement policy</p>
            </div>
          </div>

          {/* Cart actions  */}
          <div className="cartItems__action">
            <div className="cartItems__actionButton">
              <button>SAVE FOR LATER</button>
            </div>
            <div className="cartItems__actionButton">
              <button>REMOVE</button>
            </div>
          </div>
        </div>
        {/* End of product main */}
        <div className="cartItems__productMain">
          <div className="cartItems__product">
            <div className="cartItems__product_img">
              <img
                src="https://rukminim1.flixcart.com/image/224/224/ktx9si80/mobile/q/a/c/narzo-50a-rmx3430-realme-original-imag75kybaer8scz.jpeg?q=90"
                alt=""
              />
            </div>
            <div className="cartItems__product_details">
              <h1>Realme Narzo 50A (Oxygen Green, 64 GB)</h1>
              <p>₹45,007</p>
              <div className="cartItems__count">
                <RemoveIcon />
                <p>1</p>
                <AddIcon />
              </div>
            </div>
            <div className="cartItems__product_delivery">
              <h4>Delivery in 2 days</h4>
              <p>7 days replacement policy</p>
            </div>
          </div>

          {/* Cart actions  */}
          <div className="cartItems__action">
            <div className="cartItems__actionButton">
              <button>SAVE FOR LATER</button>
            </div>
            <div className="cartItems__actionButton">
              <button>REMOVE</button>
            </div>
          </div>
        </div>
      </div>
      {/* Place Order */}
      <div className="cartItems__placeOrder">
        <button onClick={handlerPlaceOrder}>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
}

export default CartItems;
