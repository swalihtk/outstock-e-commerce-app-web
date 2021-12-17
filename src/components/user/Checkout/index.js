import React, { useEffect, useState, useRef } from "react";
import { Container, Placeholder, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import NavigationBar from "../../../layouts/user/NavigationBar";
import { listAllAddress } from "../../../redux/user/addressReducer";
import Address from "./Address";
import "./checkout.css";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router";
import checkoutHelper from "../../../actions/user/checkoutHelper";

//text
import axios from "axios";
import Login from "../Login";
import OtherFooter from "../../../layouts/user/OtherFooter";

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
  let addressRedux = useSelector((state) => state.address);

  // useEffect
  useEffect(()=>{
    dispatch(listAllAddress(userId));
  }, [])

  // actions
  function handlePayment(paymentState) {
    if(productInfo.length<1) return;
    checkoutHelper.placeOrder(userId,addressState, paymentState, productInfo, totalPrice,navigate, dispatch);
  }

  let loading=true;  

  // **** checking login *******
  let { logedin } = useSelector((state) => state.userLogin);
  if(!logedin) return <Login />

  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <Row>
          <div className="col-md-6 col-12">
            {
            addressRedux.loading?
            (
              <div style={{marginTop:"3rem"}}>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </div>
            )
            :
            (<Address userId={userId} setAddressState={setAddressState}/>)}
          </div>
          <div className="col-md-6 col-12">
            <OrderDetails setPaymentState={setPaymentState} handlePayment={handlePayment} addressState={addressState} paymentState={paymentState} setProductInfo={setProductInfo} productDetails={productInfo} setTotalPrice={setTotalPrice} totalPrice={totalPrice} />
          </div>
        </Row>
        <br/>
        <OtherFooter />
      </Container>
    </>
  );
}

export default Index;
