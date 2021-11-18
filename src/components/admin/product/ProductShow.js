import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showAllProductAdmin } from "../../../redux/admin/showAllProduct";
import AllProducts from "./AllProducts";
import ProductCreate from "./ProductCreate";

function ProductShow() {
  // category state
  let [productPageState, setProductPageState] = useState("show");
  let dispatch = useDispatch();

  // manage categoy state
  function changeToShow() {
    setProductPageState("show");
  }

  function changeToCreate() {
    setProductPageState("create");
    dispatch(showAllProductAdmin());
  }

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={changeToShow}>
            Show Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={changeToCreate}>
            Create Product
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div style={{ background: "white", height: "80vh" }}>
        {productPageState === "show" ? (
          <AllProducts />
        ) : (
          productPageState === "create" && <ProductCreate />
        )}
      </div>
    </div>
  );
}

export default ProductShow;
