import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavigationBar from "../../../layouts/user/NavigationBar";
import CategoryProduct from "./CategoryProduct";
import HomeCategory from "../home/HomeCategory";
import { fetchProductsCateg } from "../../../redux/home/AllProduct";
import { useDispatch } from "react-redux";
import HomeFooter from "../../../layouts/user/HomeFooter";

function ProductListMain() {
  let { category } = useParams();

  return (
    <>
      <NavigationBar iconShow={true} />
      <HomeCategory />
      <CategoryProduct categoryName={category} />
      <HomeFooter />
    </>
  );
}

export default ProductListMain;
