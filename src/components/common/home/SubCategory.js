import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Menu} from 'antd'

function SubCategory({ sub, mainCategory }) {
  let mainCategoryNew = mainCategory.replace("&", "%26");
  return (
    <>
      
      {
        sub.map((item,index)=>{
          let itemModi = item.replace("&", "%26");
          let link = `/subcategory?category=${mainCategoryNew}&subcategory=${itemModi}`;

          return (
            <Menu.Item key={index} style={{fontSize:"16px"}}>
              <p>
                <Link to={link}>
                  {item}
                </Link>
              </p>
            </Menu.Item>
          )
        })
      }
    </>
  );
}

export default SubCategory;
