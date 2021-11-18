import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ContentSpinner from "../../../layouts/user/ContentSpinner";
import NavigationBar from "../../../layouts/user/NavigationBar";
import { getProductDetails } from "../../../redux/home/productDetails";
import ProductShowPage from "./ProductShowPage";

function ProductDetails() {
  let { prodId } = useParams();

  let { loading, product } = useSelector((state) => state.productDetailsHome);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(prodId));
  }, []);

  if (loading) {
    return <ContentSpinner variant={"primary"} />;
  } else {
    return (
      <>
        <NavigationBar iconShow={true} />

        <div style={{ marginTop: "4rem" }}>
          <ProductShowPage product={product} />
        </div>
      </>
    );
  }
}

export default ProductDetails;
