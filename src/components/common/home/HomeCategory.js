import React, { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import MainCategory from "./MainCategory";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryHome } from "../../../redux/home/categoryList";
import { LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

import ListIcon from "@material-ui/icons/List";
import { Offcanvas} from 'react-bootstrap';

function HomeCategory() {
  // redux
  let { loading, categorys } = useSelector((state) => state.categoryList);
  let dispatch = useDispatch();
  let logedin = true;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    dispatch(getAllCategoryHome());
  }, []);

  if (loading) {
    return <LinearProgress />;
  } else {
    return (
      <div>
        <div className="homeCategory__main shadow-sm">
          <Link to="/">
                <LocalOfferIcon />
                Offers
          </Link>
          <Link to="/">
                <WhatshotIcon />
                Trending Product
          </Link>
          <div className="homeCategory__mainCategorys">
          {categorys.map((category) => {
            return <MainCategory key={category._id} category={category} />;
          })}
          </div>
          <div className="homeCategory__canvas">
            <button onClick={handleShow}>
              <ListIcon style={{color:"blue"}}/>
              All Categories
            </button>

            <Offcanvas style={{width:"50vw"}} show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              {categorys.map((category) => {
              return <MainCategory key={category._id} category={category} />;
                 })}
              </Offcanvas.Body>
            </Offcanvas>
          </div>
          {/* <Nav
            className="justify-content-center"
            activeKey="/home"
            style={{ background: "white" }}
          >
            <Nav.Item>
              <Nav.Link href="#" style={{ color: "black" }}>
                <LocalOfferIcon />
                Offers
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" style={{ color: "black" }}>
                <WhatshotIcon />
                Trending Product
              </Nav.Link>
            </Nav.Item>
            {categorys.map((category) => {
              return <MainCategory key={category._id} category={category} />;
            })}
          </Nav> */}
        </div>
      </div>
    );
  }
}

export default HomeCategory;
