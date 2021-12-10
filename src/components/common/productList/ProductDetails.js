import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ContentSpinner from "../../../layouts/user/ContentSpinner";
import HomeFooter from "../../../layouts/user/HomeFooter";
import NavigationBar from "../../../layouts/user/NavigationBar";
import { getProductDetails } from "../../../redux/home/productDetails";
import ProductShowPage from "./ProductShowPage";
import SimilaryProducts from "./SimilaryProducts";

function ProductDetails() {
  let { prodId } = useParams();

  let { loading, product } = useSelector((state) => state.productDetailsHome);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(prodId));
  }, [prodId]);

  if (loading) {
    return <ContentSpinner variant={"primary"} />;
  } else {
    return (
      <>
        <NavigationBar iconShow={true} />

        <div style={{ marginTop: "1rem" }}>
          <ProductShowPage product={product} prodId={prodId} />
        </div>

        <div style={{ marginTop: "3rem" }}>
          <hr />
          <SimilaryProducts
            productName={product.name}
            categoryName={product.category}
            subCategory={product.subCategory}
          />
        </div>
        <HomeFooter />
      </>
    );
  }
}

export default ProductDetails;
