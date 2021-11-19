import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import CategoryCreate from "./CategoryCreate";
import AllCategory from "./AllCategory.js";

function CategoryShow() {
  // category state
  let [categoyState, setCategoyState] = useState("show");

  // manage categoy state
  function changeToCreate() {
    setCategoyState("create");
  }

  function changeToShow() {
    setCategoyState("show");
  }

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={changeToShow}>
            All Category
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={changeToCreate}>
            Create Category
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div style={{ background: "white", height: "80vh" }}>
        {categoyState === "show" ? (
          <AllCategory />
        ) : (
          categoyState === "create" && <CategoryCreate />
        )}
      </div>
    </div>
  );
}

export default CategoryShow;
