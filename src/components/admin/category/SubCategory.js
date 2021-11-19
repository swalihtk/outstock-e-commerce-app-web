import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import swal from "sweetalert";
import axios from "axios";

function SubCategory({ item, index, mainCatValue, getSubCategory }) {
  // set edit and filed
  let [isEditing, setIsEditing] = useState(false);
  function editingHandler() {
    setIsEditing(true);
  }

  // editing form handler
  let [editText, setEditText] = useState(item);

  // subcategory update function
  function changeSubCatName() {
    axios
      .put("/admin/category/updateSub", {
        mainCatName: mainCatValue,
        subCatName: item,
        subCatNewName: editText,
      })
      .then((response) => {
        swal("Updated!", "SubCategroy Name updated", "success");
        getSubCategory(mainCatValue);
        setIsEditing(false);
      })
      .catch((err) => {
        swal("Error!", "something went wrong!", "Error");
      });
  }

  // delete sub category
  function deleteSubCategory() {
    swal({
      title: "Are you sure?",
      text: `Do you want to delete category ${item}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/admin/category/deleteSub/`, {
            params: {
              categoryName: mainCatValue,
              subName: item,
            },
          })
          .then((response) => {
            swal("SubCategory has been deleted!!", {
              icon: "success",
            });
            getSubCategory(mainCatValue);
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
    <>
      <tr>
        <td>{index}</td>
        <td>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
              <p
                style={{
                  display: "inline",
                  marginLeft: "1rem",
                  color: "tomato",
                }}
                onClick={() => setIsEditing(false)}
              >
                <CancelIcon />
              </p>
            </>
          ) : (
            item
          )}
        </td>
        <td>
          <Button
            variant="contained"
            style={{ marginLeft: "1rem", marginTop: "0.3rem" }}
            color={isEditing ? "default" : "primary"}
            onClick={isEditing ? changeSubCatName : setIsEditing}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "1rem", marginTop: "0.3rem" }}
            color="secondary"
            onClick={deleteSubCategory}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}

export default SubCategory;
