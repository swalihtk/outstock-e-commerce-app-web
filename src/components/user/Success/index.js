import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../../../layouts/user/NavigationBar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "./style.css";
import { useNavigate } from "react-router";

function index() {
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
              <strong> Name: </strong>Swaliht{" "}
            </p>
            <p>
              <strong> Mobile: </strong>7034785939
            </p>
            <p>
              <strong> Pincode: </strong>678900
            </p>
            <p>
              <strong> Address: </strong>Thaikkaden(h),Kaithachira
            </p>
            <p>
              <strong> Town: </strong>Mannarkkad
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

export default index;
