import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavigationBar from "../../../layouts/user/NavigationBar";
import OtherFooter from "../../../layouts/user/OtherFooter";
import { isUserLogedIn } from "../../../redux/user/logincheckReducer";
import Login from "../Login";
import "./cart.css";
import CartItems from "./CartItems";
import CartPrice from "./CartPrice";


function Index() {

  // ********* check login *********
  let { logedin } = useSelector((state) => state.userLogin);

  
  if(!logedin) return <Login/>

  return (
    <>
      <NavigationBar iconShow={true} />
      <Container>
        <div className="row" style={{minHeight:"80vh"}}>
          <div className="col-md-8 col-12">
            <CartItems />
          </div>
          <div className="col-md-4 col-12">
            <CartPrice />
          </div>
        </div>
        <br/>
        <OtherFooter />
      </Container>
    </>
  );
}

export default Index;
