import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

function ProductCard({ product }) {

  let [productName, setProductName]=useState("");
  let [displayName, setDisplayName]=useState("");

  // mount
  useEffect(()=>{
    if(!product) return;
    setProductName(product.name)
    
    let str=productName.length>30?"...":" "
    setDisplayName(productName.substr(0, 30)+str);
  })


  return (
    <>
      {/* <div className="col-md-3">
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
      </div> */}
      <div className="col-6 col-md-3">
        <div className="productCard__main">
            <div className="productCard__card">
              <Link to={`/productdetails/${product._id}`}>
                <div className="productCard__img">
                  <img src={product.productImages[0].img} alt="" />
                </div>
              </Link>
            </div>
            <div className="productCard__details">
              <span className="productCard__title">{displayName}</span>
              <span className="productCard__price">₹{product.price}</span>
            </div>
        </div>
	    </div>
    </>
  );
}

export default ProductCard;
