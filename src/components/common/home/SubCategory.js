import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function SubCategory({ sub, mainCategory }) {
  let mainCategoryNew = mainCategory.replace("&", "%26");
  return (
    <>
      {sub.map((item, index) => {
        let itemModi = item.replace("&", "%26");
        let link = `/subcategory?category=${mainCategoryNew}&subcategory=${itemModi}`;
        return (
          <NavDropdown.Item as={Link} to={link} key={index} eventKey="4.1">
            {item}
          </NavDropdown.Item>
        );
      })}
    </>
  );
}

export default SubCategory;
