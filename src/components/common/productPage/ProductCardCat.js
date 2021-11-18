import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

function ProductCardCat({ product }) {
  return (
    <>
      <div className="col-md-3">
        <div className="wsk-cp-product">
          <div className="wsk-cp-img">
            <Link to={`/productdetails/${product._id}`}>
              <img
                src={product.productImages[0].img}
                alt="Product"
                className="img-responsive"
              />
            </Link>
          </div>
          <div className="wsk-cp-text">
            <div className="category">
              <span>Buy Now</span>
            </div>
            <div className="title-product">
              <h3>{product.name}</h3>
            </div>
            <div className="card-footer">
              <div className="wcf-left">
                <span className="price">₹{product.price}</span>
              </div>
              <div className="wcf-right">
                <a href="#" className="buy-btn">
                  <i className="zmdi zmdi-shopping-basket"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCardCat;
