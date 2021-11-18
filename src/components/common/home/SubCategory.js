import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function SubCategory({ sub }) {
  return (
    <>
      {sub.map((item, index) => {
        let link = `/category/${item}`;
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
