import React from "react";
import { useSearchParams } from "react-router-dom";
import NavigationBar from "../../../layouts/user/NavigationBar";
import HomeCategory from "../home/HomeCategory";
import SubCategoryList from "./SubCategoryList";

function ProductListMain() {
  let [searchParams, setSearchParams] = useSearchParams();

  let mainCat = searchParams.get("category");
  let subCat = searchParams.get("subcategory");

  return (
    <>
      <NavigationBar iconShow={true} />
      <HomeCategory />
      <SubCategoryList mainCat={mainCat} subCat={subCat} />
    </>
  );
}

export default ProductListMain;
