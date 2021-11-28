import { TableCell, TableRow, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { showAllProductAdmin } from "../../../redux/admin/showAllProduct";
import EditProduct from "./EditProduct";

function ProductCard({ item, index }) {
  // item distructure
  let { _id, name, price, productImages, shortDescription, category } = item;

  let navigate = useNavigate();

  let [showEditForm, setShowEditForm]=useState(false);

  // redux
  let dispatch = useDispatch();

  /****** Delete product ****/
  function delteProduct() {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/admin/product/delete/${_id}`)
          .then((response) => {
            swal("Product has been deleted", {
              icon: "success",
            });
            dispatch(showAllProductAdmin());
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

  /** edit product page **/
  function goToEditPage() {
    navigate(`/admin/product/edit/${_id}`);
  }

  return (
    <>
    {/* Modal for edit */}
    <Modal
        show={showEditForm}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        size={"lg"}
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Create New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct setShowEditForm={setShowEditForm} id={_id}/>
        </Modal.Body>
      </Modal>

      {/* Modal End */}
      <TableRow>
        <TableCell component="th" scope="row">
          {index}
        </TableCell>
        <TableCell align="center" style={{ width: "30%" }}>
          {name}
        </TableCell>
        <TableCell align="center">{price}</TableCell>
        <TableCell align="center">{category}</TableCell>
        <TableCell align="center">
          <img
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            src={productImages[0].img}
            alt=""
          />
        </TableCell>
        <TableCell align="center">
          <Button variant="contained" color="primary" onClick={()=>setShowEditForm(true)}>
            Edit
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "0.5rem" }}
            color="secondary"
            onClick={delteProduct}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ProductCard;
