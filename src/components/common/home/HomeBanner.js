import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

function HomeBanner() {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            style={{ maxHeight: "60vh" }}
            className="d-block w-100"
            src="https://res.cloudinary.com/da9w4jcnl/image/upload/v1637059596/Outstock%20E-Commerce%20web%20app/qnjacdarwa3lczxahtwy.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            style={{ maxHeight: "60vh" }}
            className="d-block w-100"
            src="https://res.cloudinary.com/da9w4jcnl/image/upload/v1637059596/Outstock%20E-Commerce%20web%20app/qnjacdarwa3lczxahtwy.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ maxHeight: "60vh" }}
            className="d-block w-100"
            src="https://res.cloudinary.com/da9w4jcnl/image/upload/v1637059596/Outstock%20E-Commerce%20web%20app/qnjacdarwa3lczxahtwy.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeBanner;
