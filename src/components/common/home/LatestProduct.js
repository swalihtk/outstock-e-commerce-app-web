import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "../style.css";
import ProductCard from "./ProductCard";

function LatestProduct() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/home/products/listLatest")
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
      });

    return () => {
      setProducts([]);
      setLoading(false);
    };
  }, []);

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
          <h1 style={{ color: "black" }}>Latest Products</h1>
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

export default LatestProduct;
