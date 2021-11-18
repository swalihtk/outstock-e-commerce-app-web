import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SubCategory from "./SubCategory";

function MainCategory({ category }) {
  let subCategory = category.subCategery;
  let routeCategory = category.categoryName.replace("&", "%26");

  return (
    <NavDropdown
      style={{ color: "black" }}
      title={category.categoryName}
      id="nav-dropdown"
    >
      <NavDropdown.Item
        as={Link}
        to={`/category/${routeCategory}`}
        eventKey="4.1"
      >
        All
      </NavDropdown.Item>
      <SubCategory sub={subCategory} mainCategory={category.categoryName} />
    </NavDropdown>
  );
}

export default MainCategory;
