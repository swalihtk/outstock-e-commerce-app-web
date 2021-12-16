import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "../style.css";
import ProductCard from "./ProductCard";
import error from "../../../error.png"

function LatestProduct() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [err, setErr]=useState(false);

  useEffect(() => {
    setLoading(true);
    setErr(false);
    axios
      .get("/home/products/listLatest")
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((err) => {
        setLoading(false);
        setErr(true);
      });

    return () => {
      
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "40vh",
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
  }
  else if(err){
    return (
        <div
          style={{
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
           <img src={error} style={{objectFit:"contain", width:"100%", height:"100%"}}/>
           <p className="text-danger">something went wrong!!</p>
        </div>
      );
  }
  else {
    return (
      <section style={{boxShadow:"box-shadow: 0 1px 1px 0 rgb(0 0 0 / 16%)"}}>
        <div className="container text-center mt-4">
          <h1 style={{ color: "black", fontSize:"1.4rem" }}>Latest Products</h1>
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
