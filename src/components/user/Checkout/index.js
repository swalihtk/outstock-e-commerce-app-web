import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import NavigationBar from "../../../layouts/user/NavigationBar";
import { listAllAddress } from "../../../redux/user/addressReducer";
import Address from "./Address";
import "./checkout.css";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router";
import checkoutHelper from "../../../helper/user/checkoutHelper";


function Index() {
  // hooks
  let {userId}=useParams();
  let dispatch=useDispatch();
  let navigate=useNavigate();
  
  // states
  let [addressState,setAddressState]=useState({});
  let [paymentState,setPaymentState]=useState("");
  let [productInfo, setProductInfo]=useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  // redux
  let cartRedux = useSelector((state) => state.cart);

  // useEffect
  useEffect(()=>{
    dispatch(listAllAddress(userId));
  }, [])

  // actions
  function handlePayment() {
    checkoutHelper.placeOrder(userId,addressState, paymentState, productInfo, totalPrice,navigate, dispatch);
  }

  // test
 

  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <Row>
          <div className="col-md-6 col-12">
            <Address userId={userId} setAddressState={setAddressState}/>
          </div>
          <div className="col-md-6 col-12">
            <OrderDetails setPaymentState={setPaymentState} handlePayment={handlePayment} addressState={addressState} paymentState={paymentState} setProductInfo={setProductInfo} setTotalPrice={setTotalPrice} totalPrice={totalPrice}/>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Index;
