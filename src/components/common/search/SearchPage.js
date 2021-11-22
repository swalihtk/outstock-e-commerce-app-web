import React from "react";
import axios from "axios";
import ContentSpinner from "../../../layouts/user/ContentSpinner";
import ProductCard from "../home/ProductCard";

function SearchPage(props) {
  let { searchText } = props;

  // search handler
  let [products, setProducts] = React.useState([]);
  let [loading, setLoading] = React.useState(false);

  // get products
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/home/products/search?productName=${searchText}`)
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong!!");
      });
  }, [searchText]);

  return (
    <section>
      <div className="container text-center mt-4">
        <h3 style={{ color: "black" }}>
          showing result for{" "}
          <span style={{ color: "blue" }}>"{searchText}"</span>
        </h3>
      </div>
      <div className="shell mt-4">
        <div className="container">
          <div className="row">
            {loading ? (
              <ContentSpinner />
            ) : (
              products &&
              products.map((item) => {
                return <ProductCard product={item} key={item._id} />;
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
