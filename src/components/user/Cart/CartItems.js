import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogedIn } from "../../../redux/user/logincheckReducer";
import { getCartItems, cartCountMange } from "../../../redux/user/cartReducer";
import CartItem from "./CartItem";
import cartHelper from "../../../helper/user/cartHelper";

function CartItems() {
  let navigate = useNavigate();
  let { logedin, userId } = useSelector((state) => state.userLogin);
  let cartItems = useSelector((state) => state.cart);

  // state
  let [products, setProducts] = useState(cartItems.products);

  let dispatch = useDispatch();

  function handlerPlaceOrder() {
    if(products.length > 0){
      cartHelper.gotoCheckoutPage(navigate, dispatch, userId);
    }else{
      navigate("/");
    }
  }

  useEffect(() => {
    if(!cartItems) return;
    setProducts(cartItems.products);
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems(userId));
  }, []);

  return (
    <div className="cartItems__main">
      <h1>My Cart ({cartItems.count})</h1>
      <hr />

      <div className="cartItems__container">
        {/* Cartitems product */}
        {products && products.length > 0 ? (
          products.map((item, index) => {
            let productInfo = item.productInfo;
            return (
              <CartItem
                productInfo={productInfo}
                userId={userId}
                key={index}
                item={item}
              />
            );
          })
        ) : (
          <h1>Not item found</h1>
        )}
        {/* End of product main */}
      </div>

      {/* Place Order */}
      <div className="cartItems__placeOrder">
        <button onClick={handlerPlaceOrder}>{products.length > 0?"PROCEED TO CHECKOUT":"BROWSE PRODUCTS"}</button>
      </div>
    </div>
  );
}

export default CartItems;
