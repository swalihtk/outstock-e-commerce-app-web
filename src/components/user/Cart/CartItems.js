import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogedIn } from "../../../redux/user/logincheckReducer";
import { getCartItems, cartCountMange } from "../../../redux/user/cartReducer";
import CartItem from "./CartItem";
import cartHelper from "../../../actions/user/cartHelper";

function CartItems() {
  let navigate = useNavigate();
  let { logedin, userId } = useSelector((state) => state.userLogin);
  let cartItems = useSelector((state) => state.cart);

  // state
  let [products, setProducts] = useState([]);
  let [emptyItems,setEmptyItem]=useState(false);

  let dispatch = useDispatch();

  // mount
  useEffect(()=>{
    if(!cartItems) return;
    setProducts(cartItems.products);
  }, [cartItems.products])

  // actions
  function handlerPlaceOrder() {
    if(products.length > 0){
      cartHelper.gotoCheckoutPage(navigate, dispatch, userId);
    }else{
      navigate("/");
    }
  }

  function checkUnAvailableProducts(){
    if(!cartItems) return;
    let total=0;
    products.forEach((item)=>{
      let productInfo = item.productInfo;
      if(productInfo.quantity<=0){
        total++;
      }
    })
    if(total>=1){
      setEmptyItem(true);
    }else{
      setEmptyItem(false);
    }
  }

  useEffect(() => {
    if(!cartItems) return;
    setProducts(cartItems.products);
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems(userId));
  }, []);

  useEffect(()=>{
    checkUnAvailableProducts();
  }, [cartItems])

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
                checkUnAvailableProducts={checkUnAvailableProducts}
              />
            );
          })
        ) : (
          <h1>No item found</h1>
        )}
        {/* End of product main */}
      </div>

      {/* Place Order */}
      <div className="cartItems__placeOrder">
        {
          emptyItems?
          <button style={{background:"red", color:"white"}} disabled>REMOVE UNAVAILABLE TO PROCEED !!</button>
          :
          <button onClick={handlerPlaceOrder}>{products?.length > 0?"PROCEED TO CHECKOUT":"BROWSE PRODUCTS"}</button>
        }
      </div>
    </div>
  );
}

export default CartItems;
