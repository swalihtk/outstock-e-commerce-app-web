import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

function ProductCard({ product }) {

  let [displayName, setDisplayName]=useState("");
  let {offer}=product;
  // mount
  useEffect(()=>{
    if(!product) return;

    let str=product.name.length>30?"...":" "
    setDisplayName(product.name.substr(0, 30)+str);

  })


  return (
    <>
      <div className="col-6 col-md-3">
        <div className="productCard__main">
            <div className="productCard__card">
              <Link to={`/productdetails/${product._id}`} target="_blank">
                <div className="productCard__img">
                  <img src={product.productImages[0].img} alt="" />
                </div>
              </Link>
            </div>
            <div className="productCard__details">
              <span className="productCard__title">{displayName}</span>
              {
                offer?
                <>
                <span className="productCard__price"><del>₹{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del></span>
                <span className="productCard__price"> ₹{offer.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </>
                :
                <span className="productCard__price">₹{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              }
            </div>
        </div>
	    </div>
    </>
  );
}

export default ProductCard;
