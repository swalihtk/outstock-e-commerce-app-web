import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showAllProductAdmin } from "../../../redux/admin/showAllProduct";
import AllProducts from "./AllProducts";
import ProductCreate from "./ProductCreate";
import { Pagination } from "@material-ui/lab";

function ProductShow() {
  // category state
  let [productPageState, setProductPageState] = useState("show");
  let dispatch = useDispatch();

  let { loading, error, productsArray, totalItem } = useSelector(
    (state) => state.productListAdmin
  );

  // manage categoy state
  function changeToShow() {
    setProductPageState("show");
  }

  function changeToCreate() {
    setProductPageState("create");
    dispatch(showAllProductAdmin());
  }

  function paginationHandler(e) {
    dispatch(showAllProductAdmin(e.target.textContent));
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
          <>
            <AllProducts />
            <Pagination
              count={Math.ceil(totalItem / 10)}
              onClick={paginationHandler}
            />
          </>
        ) : (
          productPageState === "create" && <ProductCreate />
        )}
      </div>
    </div>
  );
}

export default ProductShow;
