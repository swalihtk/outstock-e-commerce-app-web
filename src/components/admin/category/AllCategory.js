import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Button } from "@material-ui/core";
import swal from "sweetalert";
import SubCategory from "./SubCategory";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import "../style.css";

function AllCategory(props) {
  // category
  let [categoryArray, setCategoryArray] = useState([]);

  // loading
  let [categoryLoading, setCategoryLoading] = useState(false);

  // select handler
  let [mainCatValue, setMainCatValue] = useState("");
  let [subCatValue, setSubCatValue] = useState("");

  let [subCategoryArray, setSubCategoryArray] = useState([]);

  // editing handler
  let [isEditing, setIsEditing] = useState(false);
  let [editText, setEditText] = useState("");

  function handleEditingHandler() {
    setIsEditing(true);
  }

  // main select hanlder
  function handleMainSelect(e) {
    let value = e.target.value;
    setMainCatValue(value);
    getSubCategory(value);
    setEditText(value);
  }

  // get main array
  function getMainCat() {
    setCategoryLoading(true);
    axios
      .get("/admin/category/get")
      .then((response) => {
        let data = response.data;
        setCategoryArray(data);
        getSubCategory(data[0].categoryName);
        setCategoryLoading(false);
        setMainCatValue(data[0].categoryName);
        setEditText(data[0].categoryName);
      })
      .catch((err) => {
        alert("Something went wrong!!");
        setCategoryLoading(false);
      });
  }

  // get Subcategory
  function getSubCategory(value) {
    axios
      .get(`/admin/category/getSub/${value}`)
      .then((response) => {
        let data = response.data;

        setSubCategoryArray(data);
        setSubCatValue(data[0]);
      })
      .catch((err) => {
        alert("Something went wrong!!");
      });
  }

  // component did mount
  useEffect(() => {
    getMainCat();
  }, []);

  // change category name functions
  function changeMainCatName() {
    axios
      .put("/admin/category/updateMain", {
        newName: editText,
        mainCatName: mainCatValue,
      })
      .then((response) => {
        swal("Updated!", "Categroy Name updated", "success");
        getMainCat();
        setIsEditing(false);
      })
      .catch((err) => {
        swal("Error!", "something went wrong!", "Error");
      });
  }

  // delete main category name
  function deleteMainCategory() {
    swal({
      title: "Are you sure?",
      text: `Do you want to delete category ${mainCatValue}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/admin/category/deleteMain/${mainCatValue}`)
          .then((response) => {
            swal("Category has been deleted!!", {
              icon: "success",
            });
            getMainCat();
          })
          .catch((err) => {
            swal("Something went wrong", {
              icon: "error",
            });
          });
      } else {
        return;
      }
    });
  }

  return (
    <div>
      <h5 className="text-center">--</h5>
      <h3 className="text-center">All Category</h3>

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-md-8">
            <form className="mt-4">
              <label className="mb-2">MainCategory</label>
              <Button
                // startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                color="primary"
                variant="outlined"
                style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
                onClick={isEditing ? changeMainCatName : handleEditingHandler}
              >
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </Button>
              {isEditing === false && (
                <Button
                  color="secondary"
                  variant="outlined"
                  style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
                  onClick={deleteMainCategory}
                >
                  <DeleteForeverIcon />
                </Button>
              )}

              {categoryLoading && <LinearProgress />}
              {isEditing ? (
                <>
                  <Button
                    color="secondary"
                    variant="outlined"
                    style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
                    onClick={() => setIsEditing(false)}
                  >
                    <CancelIcon />
                  </Button>

                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="categorymain-editing"
                    autoFocus
                  />
                </>
              ) : (
                <Form.Select
                  size="lg"
                  value={mainCatValue}
                  onChange={handleMainSelect}
                >
                  {categoryArray?.map((item) => {
                    return <option key={item._id}>{item.categoryName}</option>;
                  })}
                </Form.Select>
              )}
              <br />
              <label className="mb-2">SubCategory</label>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategoryArray.map((item, index) => {
                    return (
                      <SubCategory
                        index={index + 1}
                        key={index}
                        item={item}
                        mainCatValue={mainCatValue}
                        getSubCategory={getSubCategory}
                      />
                    );
                  })}
                </tbody>
              </Table>
              <br />
            </form>
          </div>
          <div className="col-12 col-md-2"></div>
        </div>
      </div>
    </div>
  );
}

export default AllCategory;
