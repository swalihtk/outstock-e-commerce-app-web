import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

function ProductCardCat({ product }) {

  let [displayName, setDisplayName]=useState("");

  // mount
  useEffect(()=>{
    
    if(!product) return;

    let str=product.name.length>30?"...":" "
    setDisplayName(product.name.substr(0, 30)+str);

  }, [product])

  return (
    <>
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

export default ProductCardCat;
