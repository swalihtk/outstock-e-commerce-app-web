import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import ProductCard from './ProductCard';
import productHelper from "../../../actions/user/productHelper";

function OfferProduct() {

    let [loading, setLoading]=useState(false);
    let [products, setProducts]=useState([]);

    // mount
    useEffect(()=>{
        productHelper.listOfferProduct(true, 1, setProducts, setLoading);
    }, [products])

    if (loading) {
        return (
          <div
            style={{
              height: "30vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="grow" variant="light" />
            <h4 className="mt-4">Loading </h4>
          </div>
        );
      } else {
        return (
          <section>
            <div className="container text-center mt-4">
              <h1 style={{ color: "black", fontSize:"1.4rem" }}>Offer Products</h1>
            </div>
            <div className="shell">
              <div className="container">
                <div className="row">
                  {products.map((item, key) => {
                    return <ProductCard product={item} key={item._id} />;
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      }
}

export default OfferProduct
