import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "./style.css";

function ProductShowPage({ product }) {
  useEffect(() => {
    const imgs = document.querySelectorAll(".img-select a");
    const imgBtns = [...imgs];
    let imgId = 1;
    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
      });
    });
    function slideImage() {
      const displayWidth = document.querySelector(
        ".img-showcase img:first-child"
      ).clientWidth;
      document.querySelector(".img-showcase").style.transform = `translateX(${
        -(imgId - 1) * displayWidth
      }px)`;
    }
    window.addEventListener("resize", slideImage);
  }, []);

  return (
    <div className="card-wrapper" style={{ display: "flex" }}>
      <div className="card">
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              <img src={product?.productImages[0].img} alt="shoe image" />
              <img src={product?.productImages[1].img} alt="shoe image" />
              <img src={product?.productImages[2].img} alt="shoe image" />
            </div>
          </div>
          <div className="img-select">
            <div className="img-item">
              <a href="#" data-id="1">
                <img src={product.productImages[0].img} alt="shoe image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" data-id="2">
                <img src={product.productImages[1].img} alt="shoe image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" data-id="3">
                <img src={product.productImages[2].img} alt="shoe image" />
              </a>
            </div>
          </div>
        </div>

        <div className="product-content">
          <h2 className="product-title">{product.name}</h2>
          <a href="#" className="product-link">
            visit nike store
          </a>
          <div className="product-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div className="product-price">
            <p className="last-price">
              Old Price: <span>{product.price}</span>
            </p>
            <p className="new-price">
              New Price: <span>{product.price}</span>
            </p>
          </div>

          <div className="product-detail">
            <h2>about this item: </h2>
            <p>{product.details}</p>
            <p>{product.shortDescription}</p>
            <ul>
              <li>
                Color: <span>{product.color}</span>
              </li>
              <li>
                Available: <span>in stock</span>
              </li>
              <li>
                Category: <span>{product.category}</span>
              </li>
              <li>
                Brand: <span>{product.brand}</span>
              </li>
              <li>
                Shipping Area: <span>All over the world</span>
              </li>
            </ul>
          </div>

          <div className="purchase-info">
            {/* <input type="number" min="0" value="1" /> */}
            <button type="button" className="btn">
              Add to Cart <i className="fas fa-shopping-cart"></i>
            </button>
            <button type="button" className="btn">
              Compare
            </button>
          </div>

          <div className="social-links">
            <p>Share At: </p>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowPage;
