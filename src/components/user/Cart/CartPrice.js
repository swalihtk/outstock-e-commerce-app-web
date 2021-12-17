import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CartPrice() {
  let cartProducts = useSelector((state) => state.cart);
  let [totalPrice, setTotalPrice] = useState(0);
  let [cartItems,setCartItems]=useState([]);

  useEffect(() => {

    if(cartProducts.products){
      setCartItems(cartProducts.products);
      let total = 0;
      cartProducts.products.forEach((item) => {
      let productInfo = item.productInfo;
      if(productInfo.offer){
        setTotalPrice(Math.round((total += item.products.quantity * productInfo.offer.offerPrice)));
      }else{
        setTotalPrice(Math.round((total += item.products.quantity * productInfo.price)));
      }
    });
    }


  }, [cartProducts]);

  return (
    <div className="cartPrice__main">
      <h1>PRICE DETAILS</h1>
      <hr />
      <div className="cartPrice__price">
        <p>Price ({cartProducts.count} item)</p>
        <p>₹{totalPrice}</p>
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
          <strong>₹{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
        </h4>
      </div>
    </div>
  );
}

export default CartPrice;
