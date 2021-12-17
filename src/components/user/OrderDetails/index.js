import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import NavigationBar from "../../../layouts/user/NavigationBar";
import OrderAddress from "./OrderAddress";
import "./OrderDetails.css";
import OrderProduct from "./OrderProduct";
import {useSearchParams} from "react-router-dom"
import orderHelper from "../../../actions/user/orderHelper";
import Login from "../Login";
import { useDispatch, useSelector } from "react-redux";
import OtherFooter from "../../../layouts/user/OtherFooter";

function Index() {

  // hooks
  let [searchParams,setSearchPrams]=useSearchParams();

  // querys
  let userId=searchParams.get("userId");
  let orderId=searchParams.get("orderId");

  // state
  let [orderDetails,setOrderDetails]=useState({});
  let [detailsLoading, setDetailsLoading]=useState(false);

  // mount
  useEffect(()=>{
    getCompleteOrderDetails();
  }, [])

  // handle action
  function handleOrderCancel(){
    orderHelper.cancelOrder(userId, orderId, getCompleteOrderDetails)
  }

  // mount action
  function getCompleteOrderDetails(){
    orderHelper.getUserOrderDetails(userId, orderId, setOrderDetails, setDetailsLoading);
  }

  // test
  //console.log(orderDetails);
  
  // **** checking login *******
  let { logedin } = useSelector((state) => state.userLogin);
  if(!logedin) return <Login />

  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <h1
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "2rem" }}
        >
          Order Details
        </h1>
        {
        detailsLoading?
        (
          <div style={{display:"grid", placeItems:"center", height:"70vh"}}>
            <Spinner animation="border" variant="primary" />
          </div>
        )
        :
        (<Row style={{minHeight:"70vh"}}>
          <div className="col-md-12 col-12">
            <OrderAddress orderDetails={orderDetails.orderDetails} handleOrderCancel={handleOrderCancel}/>
          </div>
          <div className="col-md-12 col-12">
            <OrderProduct productInfo={orderDetails.productsInfo} orderDetails={orderDetails.orderDetails}/>
          </div>
        </Row>)}
        <OtherFooter />
      </Container>
    </>
  );
}

export default Index;
