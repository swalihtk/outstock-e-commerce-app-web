import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import bannerHelper from "../../../actions/user/bannerHelper";

function HomeBanner() {

  // state
  let [allBanners, setAllBanners]=useState([]);
  let [loading,setLoading]=useState(false);

  // mount
  useEffect(()=>{
    bannerHelper.getAllBanners(setAllBanners, setLoading);

    return ()=>{
      
    }
  },[])

  return (
    <div>
      <Carousel>
        {
          loading?
          <Carousel.Item interval={3000}>
            <div style={{height:"40vh", display:"grid", placeItems:"center"}}>
            <Spinner animation="border" variant="primary" />
            </div>
        </Carousel.Item>
          :
          allBanners.map(item=>{
            return (
              <Carousel.Item key={item._id} interval={1000}>
                <a href={item.link}>
                <img
                  style={{ maxHeight: "60vh", objectFit:"cover" }}
                  className="d-block w-100"
                  src={item.poster_image}
                  alt="First slide"
                />
                </a>
                {/* <Carousel.Caption>
                  <h3 style={{textShadow:" 0 0 2px black",color: "white"}}>{item.title}</h3>
                </Carousel.Caption> */}
                </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  );
}

export default HomeBanner;
