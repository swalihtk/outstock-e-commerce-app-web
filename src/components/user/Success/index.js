import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../../../layouts/user/NavigationBar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "./style.css";
import { useNavigate } from "react-router";
import {useSelector} from "react-redux";

function Index() {

  // redux
  let tempFile=useSelector(state=>state.temp)

  // state
  let [address, setAddress]=useState({});

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
          <HomeNavigationButton />

          <div className="orderSuccess__orderDetails">
            <h1>Order Address</h1>
            <p>
              <strong> Name: </strong>{address.FullName}
            </p>
            <p>
              <strong> Mobile: </strong>{address.Mobile}
            </p>
            <p>
              <strong> Pincode: </strong>{"111"}
            </p>
            <p>
              <strong> Address: </strong>{address.Address}
            </p>
            <p>
              <strong> Town: </strong>{address.Town}
            </p>
            <p>
              <strong> Landmark: </strong>Linsha Medicals
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

function HomeNavigationButton() {
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
    </div>
  );
}

export default Index;
