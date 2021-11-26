import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "../../../layouts/user/NavigationBar";
import { loadSpinner } from "../../../redux/user/spinnerLoading";
import ContentSpinner from "../../../layouts/user/ContentSpinner";
import HomeBanner from "./HomeBanner";
import HomeCategory from "./HomeCategory";
import LatestProduct from "./LatestProduct";
import "./style.css";

function Home() {
  let { loading } = useSelector((state) => state.spinner);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSpinner());
  }, []);

  if (loading) {
    return <ContentSpinner variant="secondary" />;
  } else {
    return (
      <>
        <NavigationBar iconShow={true} />

        <HomeCategory />
        <HomeBanner />
        <LatestProduct />
      </>
    );
  }
}

export default Home;
