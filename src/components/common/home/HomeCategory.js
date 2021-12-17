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

    return ()=>{
      
    }
  }, []);

  if (loading) {
    return <LinearProgress />;
  } else {
    return (
      <div>
        <div className="homeCategory__main shadow-sm">
          <Link to="/#offer_products">
                <LocalOfferIcon />
                Offers
          </Link>
          <Link to="/#trending_products">
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
          
        </div>
      </div>
    );
  }
}

export default HomeCategory;
