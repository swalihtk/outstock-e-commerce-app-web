import React from "react";
import { Link } from "react-router-dom";

function SubCategory({ sub, mainCategory }) {
  let mainCategoryNew = mainCategory.replace("&", "%26");
  return (
    <>
      
      {
        sub.map((item,index)=>{
          let itemModi = item.replace("&", "%26");
          let link = `/subcategory?category=${mainCategoryNew}&subcategory=${itemModi}`;

          return (
            <>
            <Link to={link}>
              {item}
            </Link>
          </>
          )
        })
      }
    </>
  );
}

export default SubCategory;
