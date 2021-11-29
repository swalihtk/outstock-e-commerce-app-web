import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../../../layouts/user/NavigationBar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "./style.css";
import { useNavigate, useParams } from "react-router";
import {useSelector} from "react-redux";

function Index() {

  // redux
  let tempFile=useSelector(state=>state.temp)

  // state
  let [address, setAddress]=useState({});

  // useparams
  let {userId}=useParams();

  // useEffect
  useEffect(()=>{
    if(tempFile.address){
      setAddress(tempFile.address);
    }
  },[tempFile])

  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <div className="orderSuccess__main">
          <div className="orderSuccess__message">
            <CheckCircleOutlineIcon />
            <h1>
              <span style={{ color: "darkblue" }}>THANKYOU!</span> Your Order
              Has Been Recieved
            </h1>
          </div>
          <HomeNavigationButton userId={userId}/>
          
        </div>
      </Container>
    </>
  );
}

function HomeNavigationButton({userId}) {
  let navigate = useNavigate();

  return (
    <div className="orderSuccess__continueShoping_btn">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        CONTINUE SHOPING
      </button>
      <button
        onClick={() => {
          navigate("/orders/"+userId);
        }}
        style={{marginLeft:"1rem", background:"green"}}
      >
        SHOW ORDERS
      </button>
    </div>
  );
}

export default Index;
