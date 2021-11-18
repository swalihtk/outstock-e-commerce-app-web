import React, { useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import MainCategory from "./MainCategory";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryHome } from "../../../redux/home/categoryList";
import { LinearProgress } from "@material-ui/core";

function HomeCategory() {
  // redux
  let { loading, categorys } = useSelector((state) => state.categoryList);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoryHome());
  }, []);

  if (loading) {
    return <LinearProgress />;
  } else {
    return (
      <div>
        <div>
          <Nav
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
          </Nav>
        </div>
      </div>
    );
  }
}

export default HomeCategory;
