import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SubCategory from "./SubCategory";
import { Menu, Dropdown, Space } from "antd";


function MainCategory({ category }) {
  let subCategory = category.subCategery;
  let routeCategory = category.categoryName.replace("&", "%26");

  return (
    // <NavDropdown
    //   style={{ color: "black" }}
    //   title={category.categoryName}
    //   id="nav-dropdown"
    // >
    //   <NavDropdown.Item style={{display:"inline"}}
    //     as={Link}
    //     to={`/category/${routeCategory}`}
    //     eventKey="4.1"
    //   >
    //     All
    //   </NavDropdown.Item>
    //   <SubCategory sub={subCategory} mainCategory={category.categoryName} />
    // </NavDropdown>
    <div className="mainCategory__main">
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          overlay={
            <Menu>
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
