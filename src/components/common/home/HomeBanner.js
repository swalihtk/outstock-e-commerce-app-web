import React, { useEffect, useState } from "react";
import { Carousel, Placeholder } from "react-bootstrap";
import bannerHelper from "../../../helper/user/bannerHelper";

function HomeBanner() {

  // state
  let [allBanners, setAllBanners]=useState([]);
  let [loading,setLoading]=useState(false);

  // mount
  useEffect(()=>{
    bannerHelper.getAllBanners(setAllBanners, setLoading);
  },[])

  return (
    <div>
      <Carousel>
        {
          loading?
          <Carousel.Item interval={1000}>
          <img
            style={{ maxHeight: "60vh", objectFit:"contain" }}
            className="d-block w-100"
            src="https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif"
            alt="First slide"
          />
          <Carousel.Caption>
            <Placeholder animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Carousel.Caption>
        </Carousel.Item>
          :
          allBanners.map(item=>{
            return (
              <Carousel.Item key={item._id} interval={1000}>
                <a href={item.link}>
                <img
                  style={{ maxHeight: "60vh" }}
                  className="d-block w-100"
                  src={item.poster_image}
                  alt="First slide"
                />
                </a>
                <Carousel.Caption>
                  <h3 style={{textShadow:" 0 0 2px black",color: "white"}}>{item.title}</h3>
                </Carousel.Caption>
                </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  );
}

export default HomeBanner;
