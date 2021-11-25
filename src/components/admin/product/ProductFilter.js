import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch } from "react-redux";
import { showFilterdProducts } from "../../../redux/admin/showAllProduct";

const { SubMenu } = Menu;

function ProductFilter() {
  // category
  let [categoryArray, setCategoryArray] = useState([]);
  let [subCategoryArray, setSubCategoryArray] = useState([]);
  let [mainCatValue, setMainCatValue] = useState("");
  let [subCatValue, setSubCatValue] = useState("");
  let [isFiltering, setIsFiltering] = useState("");

  let dispatch = useDispatch();

  async function getMainCat() {
    let result = await axios.get("/admin/category/get");
    setCategoryArray(result.data);
    await setMainCatValue(
      result.data.length > 0 && result.data[0].categoryName
    );
    getSubCat(result.data.length > 0 && result.data[0].categoryName);
  }

  async function getSubCat(value) {
    let result = await axios.get(`/admin/category/getSub/${value}`);
    setSubCategoryArray(result.data);
    await setSubCatValue(result.data && result.data[0]);
  }

  useEffect(() => {
    getMainCat();
  }, []);

  function handleMainCategoryMenu(value) {
    setIsFiltering(true);
    setMainCatValue(value);
    getSubCat(value);
    dispatch(showFilterdProducts(mainCatValue, subCatValue));
  }

  function handleSubCategoryMenu(value) {
    setIsFiltering(true);
    setSubCatValue(value);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0.7" }}>
        <Menu mode="horizontal">
          {/* Category Main Filter */}
          <SubMenu
            key="MainMenu"
            icon={<SettingOutlined />}
            title="Main Category"
          >
            <Menu.ItemGroup title="all">
              <div>
                {categoryArray.map((item, index) => (
                  <Menu.Item
                    onClick={() => handleMainCategoryMenu(item.categoryName)}
                    key={index}
                  >
                    {item.categoryName}
                  </Menu.Item>
                ))}
              </div>
            </Menu.ItemGroup>
          </SubMenu>

          {/* Category Sub Filter */}
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title="Sub Category"
          >
            <Menu.ItemGroup title="All">
              {subCategoryArray.map((item, index) => (
                <Menu.Item
                  onClick={() => handleSubCategoryMenu(item)}
                  key={index}
                >
                  {item}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </div>

      {isFiltering && (
        <>
          <div
            className="filter__title"
            style={{ display: "flex", marginTop: "1rem" }}
          >
            <CancelIcon style={{ marginRight: "1rem" }} />
            <p>
              <strong>Category: </strong>
              {mainCatValue}
            </p>
            {subCatValue && (
              <p style={{ marginLeft: "1rem" }}>
                <strong>SubCategory: </strong>
                {subCatValue}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductFilter;
