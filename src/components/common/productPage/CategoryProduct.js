import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentSpinner from "../../../layouts/user/ContentSpinner";
import { fetchProductsCateg } from "../../../redux/home/AllProduct";
import ProductCardCat from "./ProductCardCat";

function CategoryProduct({ categoryName }) {
  // redux
  let { loading, products } = useSelector((state) => state.productByCategory);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsCateg(categoryName));
    return () => {
      loading = false;
      products = [];
    };
  }, [categoryName]);

  if (loading) {
    return <ContentSpinner variant="success" />;
  } else {
    if (products.length <= 0) {
      return (
        <section>
          <div className="container text-center mt-4">
            <h3 style={{ color: "black" }}>
              Category <span style={{ color: "red" }}>"{categoryName}"</span>
            </h3>
          </div>
          <h3 className="text-center" style={{ marginTop: "3rem", height:"30vh" }}>
            ☹️☹️ No Product found in this category
          </h3>
        </section>
      );
    } else {
      return (
        <section>
          <div className="container text-center mt-4">
            <h3 style={{ color: "black", fontSize:"1.2rem" }}>
              Category <span style={{ color: "green" }}>"{categoryName}"</span>
            </h3>
          </div>
          <div className="shell mt-4">
            <div className="container">
              <div className="row">
                {products.map((item, key) => {
                  return <ProductCardCat product={item} key={item._id} />;
                })}
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

export default CategoryProduct;
