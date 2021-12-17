import React, { useEffect, useState } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../redux/user/cartReducer";
import cartHelper from "../../../actions/user/cartHelper";
import whishlistHelper from "../../../actions/user/whishlistController";
import { Spinner } from "react-bootstrap";

function CartItem({ productInfo, item, userId, checkUnAvailableProducts }) {
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
  let [countLoad, setCountLoad]=useState(false);

  function countHandler(quantity) {
    cartHelper.cartCountManger(userId, prodId, quantity, setCountLoad);
  }

  useEffect(() => {
    setQuanity(item.products.quantity);
    setProdId(item.products.productId);
  }, [item]);
  useEffect(()=>{
    if(!productInfo) return;
    if(productInfo.offer){
      setTotalPrice(item.products.quantity*productInfo.offer.offerPrice);
    }else{
      setTotalPrice(item.products.quantity*productInfo.price)
    }
  }, [productInfo])

  // delete
  function deleteFromCart() {
    cartHelper.removeFromCart(userId, prodId, dispatch, checkUnAvailableProducts);
  }

  // Add to whishlist
  let [whishlistAdding, setWhishlistAdding]=useState(false);
  let [whishListErr, setWhishlistErr]=useState("");

  function saveForLater(){
    whishlistHelper.addToWhishlist(setWhishlistAdding, setWhishlistErr, userId, prodId, dispatch);
  }

  

  // test
  

  return (
    <div className="cartItems__productMain">
      <div className="cartItems__product">
        <div className="cartItems__product_img">
          <img src={image} alt="" />
        </div>
        <div className="cartItems__product_details">
          <h1>{productName.length>47?
            productName.substr(0, 47)+"..."
            :
            productName
        }</h1>
          <p>₹{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <div className="cartItems__count">
              {
              countLoad?
              (
                <div style={{display:"grid",placeItems:"center", width:"3vw",height:"3vh"}}>
                  <Spinner animation="border" variant="primary" size="sm"/>
                </div>
                
              )
              :
              
                
                  productInfo.quantity>3?
                  (
                    <select className="quantity_select" value={quantity} onChange={(e)=>{
                      setQuanity(e.target.value);
                      countHandler(e.target.value);
                      }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    </select>
                  ):
                  productInfo.quantity<=0?
                  <p className="text-danger">Currently Available</p>
                  :
                  (
                    <select className="quantity_select" value={quantity} onChange={(e)=>{
                      setQuanity(e.target.value);
                      countHandler(e.target.value);
                      }}>
                    {Array.from(Array(productInfo.quantity), (val,index)=><option key={index}>{index+1}</option>)}
                    </select>
                    )
                }
              
              
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
          <button onClick={saveForLater}>SAVE FOR LATER</button>
        </div>
        <div className="cartItems__actionButton">
          <button onClick={deleteFromCart}>REMOVE</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
