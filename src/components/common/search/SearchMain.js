import React from "react";
import { useSearchParams } from "react-router-dom";
import NavigationBar from "../../../layouts/user/NavigationBar";
import HomeCategory from "../home/HomeCategory";
import SearchPage from "./SearchPage";

function SearchMain() {
  let [searchParams] = useSearchParams();

  let searchText = searchParams.get("product");

  return (
    <>
      <NavigationBar iconShow={true} />
      <HomeCategory />
      <SearchPage searchText={searchText} />
    </>
  );
}

export default SearchMain;
