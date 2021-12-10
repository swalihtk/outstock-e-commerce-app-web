import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentSpinner from "../../../layouts/user/ContentSpinner";
import { listProductsInSubCat } from "../../../redux/home/AllProductSub";
import ProductCardCat from "../productPage/ProductCardCat";

function SubCategoryList({ mainCat, subCat }) {
  let dispatch = useDispatch();

  let { loading, products } = useSelector((state) => state.productBySubCat);

  useEffect(() => {
    dispatch(listProductsInSubCat(mainCat, subCat));
  }, [mainCat, subCat, dispatch]);

  if (loading) {
    return <ContentSpinner variant="success" />;
  } else {
    if (products.length <= 0) {
      return (
        <section>
          <div className="container text-center mt-4">
            <h3 style={{ color: "black" }}>
              SubCategory <span style={{ color: "red" }}>"{subCat}"</span>
            </h3>
          </div>
          <h3 className="text-center" style={{ marginTop: "3rem",height:"30vh" }}>
            ☹️☹️ No Product found in this category
          </h3>
        </section>
      );
    } else {
      return (
        <section>
          <div className="container text-center mt-4">
            <h3 style={{ color: "black" }}>
              SubCategory <span style={{ color: "green" }}>"{subCat}"</span>
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

export default SubCategoryList;
