import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SubCategory from "./SubCategory";
import { Menu, Dropdown, Space } from "antd";


function MainCategory({ category }) {
  let subCategory = category.subCategery;
  let routeCategory = category.categoryName.replace("&", "%26");

  return (
    <div className="mainCategory__main">
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={-1} style={{fontSize:"16px"}}>
                <p>
                  <Link to={`/category/${routeCategory}`}>
                    All
                  </Link>
                </p>
              </Menu.Item>
              <SubCategory sub={subCategory} mainCategory={category.categoryName} />
            </Menu>
          }
          placement="bottomLeft"
        >
          <p style={{ margin: 0 }}>{category.categoryName}</p>
        </Dropdown>
      </Space>
    </Space>
    </div>
  );
}

export default MainCategory;
