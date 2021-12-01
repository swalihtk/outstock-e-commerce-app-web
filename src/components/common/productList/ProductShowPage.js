import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./style.css";
import ReactImageMagnify from "react-image-magnify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { addToCart } from "../../../redux/user/cartReducer";

function ProductShowPage({ product, prodId }) {
  let productImages = product.productImages;
  let navigate = useNavigate();
  let { products } = useSelector((state) => state.cart);

  let [inCart, setInCart] = useState(false);
  useEffect(() => {
    products &&
      products.map(
        (items) =>
          items.products &&
          items.products.productId === prodId &&
          setInCart(true)
      );

    return () => {
      setInCart(false);
    };
  }, []);

  let dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  let { logedin, userId } = useSelector((state) => state.userLogin);

  let [showImage, setShowImage] = useState(
    productImages
      ? productImages[0].img
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
  );

  function handleAddToCart() {
    if (!logedin) {
      navigate("/login");
      return;
    }

    if (inCart) {
      navigate("/cart");
    } else {
      dispatch(addToCart(userId, product._id));
      setVisible(true);
      setInCart(true);
    }
  }

  function changeShowImage(num) {
    switch (num) {
      case 1:
        setShowImage(
          productImages
            ? productImages[0].img
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
        );
        break;
      case 2:
        setShowImage(
          productImages
            ? productImages[1].img
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
        );
        break;
      case 3:
        setShowImage(
          productImages
            ? productImages[2].img
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
        );
        break;
      default:
        setShowImage(
          productImages
            ? productImages[1].img
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
        );
    }
  }

  const imageProps = {
    smallImage: {
      alt: "Phasellus laoreet",
      width: 450,
      height: 450,
      isFluidWidth: true,
      src: showImage,
    },
    largeImage: {
      src: showImage,
      width: 1200,
      height: 1800,
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-12">
          <h2>Product details</h2>
        </div>
        <div className="col-md-6 col-12">
          {visible && (
            <Alert variant={"success"}>Item uploaded to cart!!</Alert>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-5">
          <ReactImageMagnify {...imageProps} />

          {/* <img src={product} alt="Phasellus laoreet" width="100%" /> */}
          <div className="product-subimages">
            <img
              style={{ maxWidth: "100px", maxHeight: "200px" }}
              src={
                productImages
                  ? productImages[0].img
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
              }
              onClick={() => changeShowImage(1)}
            />
            <img
              style={{ maxWidth: "100px", maxHeight: "200px" }}
              src={
                productImages
                  ? productImages[1].img
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
              }
              onClick={() => changeShowImage(2)}
            />
            <img
              style={{ maxWidth: "100px", maxHeight: "200px" }}
              src={
                productImages
                  ? productImages[2].img
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
              }
              onClick={() => changeShowImage(3)}
            />
          </div>
        </div>

        <div className="col-md-7">
          <p className="title">{product.name}</p>
          <p className="desc">{product.details}</p>
          <div className="options">
            <p>Product Details</p>
            <p className="btn btn-outline-secondary mr-2">
              <strong style={{ color: "red" }}>Color: </strong>
              <span
                style={{
                  background: product.color,
                  width: "10px",
                  height: "10px",
                }}
              >
                {product.color}
              </span>
            </p>
            <p className="btn btn-outline-secondary mr-2">
              <strong style={{ color: "red" }}>Brand: </strong>
              {product.brand}
            </p>
            <p className="btn btn-outline-secondary mr-2">
              <strong style={{ color: "red" }}>Category: </strong>
              {product.category}
            </p>
          </div>
          <div className="add-cart">
            {
              product.offer?
              <p className="float-left mr-3"><del>₹{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del> ₹{product.offer.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              :
              <p className="float-left mr-3">₹{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            }
            <input
              type="button"
              value={inCart ? "Go to cart" : "Add to cart"}
              className="btn btn-success float-left"
              onClick={handleAddToCart}
            />
            <input
              type="button"
              value="Add to wishlist"
              style={{ marginLeft: "1rem" }}
              className="btn btn-danger float-left"
            />
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowPage;
