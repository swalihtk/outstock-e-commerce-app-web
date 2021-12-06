import React from "react";
import { Link } from "react-router-dom";
import SubCategory from "./SubCategory";

function MainCategory({ category }) {
  let subCategory = category.subCategery;
  let routeCategory = category.categoryName.replace("&", "%26");

  return (
    <div className="mainCategory__main">
      <div className="dropdown">
        <button className="dropbtn">
        {category.categoryName}
        </button>
        <div id="myDropdown" className="dropdown-content">
          <Link to={`/category/${routeCategory}`}>
                    All
          </Link>
          <SubCategory sub={subCategory} mainCategory={category.categoryName} />
        </div>
      </div>
    </div>
  );
}

export default MainCategory;
