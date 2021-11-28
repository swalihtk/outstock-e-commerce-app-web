import React, { useEffect, useState } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../redux/user/cartReducer";
import cartHelper from "../../../actions/user/cartHelper";

function CartItem({ productInfo, item, userId }) {
  let [quantity, setQuanity] = useState(
    item.products ? item.products.quantity : 1
  );

  let [totalPrice, setTotalPrice] = useState(item.totalPrice);
  let [price, setPrice] = useState(productInfo.price);
  let [image, setImage] = useState(
    productInfo ? productInfo.productImages[0].img : " "
  );
  let [productName, setProductName] = useState(
    productInfo ? productInfo.name : " "
  );
  let [prodId, setProdId] = useState(item.products.productId);

  let dispatch = useDispatch();

  async function countHanlder(action) {
    try {
      await cartHelper.cartCountManger(userId, prodId, action);
      dispatch(getCartItems(userId));
    } catch (err) {
      return;
    }
  }

  useEffect(() => {
    setTotalPrice(item.totalPrice);
    setQuanity(item.products.quantity);
    setProdId(item.products.productId);
  }, [item]);

  // delete
  function deleteFromCart() {
    cartHelper.removeFromCart(userId, prodId, dispatch);
  }

  return (
    <div className="cartItems__productMain">
      <div className="cartItems__product">
        <div className="cartItems__product_img">
          <img src={image} alt="" />
        </div>
        <div className="cartItems__product_details">
          <h1>{productName}</h1>
          <p>{totalPrice}</p>
          <div className="cartItems__count">
            <RemoveIcon onClick={() => countHanlder(0)} />
            <p>{quantity}</p>

            <AddIcon onClick={() => countHanlder(1)} />
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
          <button onClick={deleteFromCart}>REMOVE</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
