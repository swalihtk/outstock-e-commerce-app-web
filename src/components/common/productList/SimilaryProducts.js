import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentSpinner from "../../../layouts/user/ContentSpinner";
import { listProductsInSubCat } from "../../../redux/home/AllProductSub";
import ProductCard from "../home/ProductCard";

function SimilaryProducts(props) {
  let { categoryName, subCategory, productName } = props;

  let { loading, products } = useSelector((state) => state.productBySubCat);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsInSubCat(categoryName, subCategory));
  }, [dispatch]);

  if (loading) {
    return <ContentSpinner />;
  } else {
    return (
      <section>
        <div className="container text-left mt-4">
          <h3 style={{ color: "black" }}>You might also like</h3>
        </div>
        <div className="shell mt-4">
          <div className="container">
            <div className="row">
              {products.map((item, index) => {
                if (item.name === productName) {
                  return;
                } else if (index <= 6) {
                  return <ProductCard product={item} key={item._id} />;
                } else {
                  return;
                }
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SimilaryProducts;
