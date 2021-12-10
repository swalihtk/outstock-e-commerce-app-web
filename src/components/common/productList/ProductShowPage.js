import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./style.css";
import ReactImageMagnify from "react-image-magnify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { addToCart } from "../../../redux/user/cartReducer";
import Swal from "sweetalert2";
import whishlistAction from "../../../actions/user/whishlistController";

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
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Cart added successfully!!!'
      })

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


  //  Add to whishlist
  let [whishlistAdding, setWhishListAdding]=useState(false);
  let [whishlistErr, setWhishlistErr]=useState("");

  function addToWhishlist(){

    if(!logedin){
      navigate("/login");
      return;
    }
    whishlistAction.addToWhishlist(setWhishListAdding, setWhishlistErr, userId, prodId, dispatch);
  } 

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
              <strong style={{ color: "red" }}>Color</strong>
              <div style={{background:product.color, height:"5px"}}></div>
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
              <p className="float-left mr-3"><del>₹{product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del> ₹{product?.offer?.offerPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              :
              <p className="float-left mr-3">₹{product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            }
            {
              product?.quantity<1&&
              <p style={{color:"red", fontSize:"14px"}}>Currently not available</p>
            }
            {
              product?.quantity>0&&
              <input
              type="button"
              value={inCart ? "Go to cart" : "Add to cart"}
              className="btn btn-success float-left"
              onClick={handleAddToCart}
            />
            }
            <input
              type="button"
              value="Add to wishlist"
              style={{ marginLeft: "1rem" }}
              className="btn btn-danger float-left"
              onClick={addToWhishlist}
            />
            <div className="clearfix"></div>
              <p style={{fontSize:"16px", marginTop:"1rem"}}>{product?.discription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowPage;
