import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./style.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../redux/user/cartReducer";

function Logout() {
  let navigater = useNavigate();

  // loading states
  let [logoutLoading, setLogoutLoading] = useState(true);

  let dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("/user/auth/signout")
        .then((respnse) => {
          setLogoutLoading(false);
          setTimeout(() => {
            navigater("/");
          }, 1000);
        })
        .catch((err) => {
          alert("Something went wrong");
          navigater("/");
        });
    }, 1000);
  }, []);

  return (
    <div className="logout">
      {logoutLoading ? (
        <>
          <Spinner animation="grow" variant="success" />
          <h3 className="mt-3">User logouting..</h3>
        </>
      ) : (
        <>
          <CheckCircleOutlineIcon />
          <h3>success</h3>
        </>
      )}
    </div>
  );
}

export default Logout;
