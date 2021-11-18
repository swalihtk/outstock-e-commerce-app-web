import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAllProductAdmin } from "../../../redux/admin/showAllProduct";
import ProductCard from "./ProductCard";
import "../style.css";

// product table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from "@material-ui/core";
import EditProduct from "./EditProduct";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AllProducts() {
  const classes = useStyles();

  // product redux
  let { loading, error, productsArray } = useSelector(
    (state) => state.productListAdmin
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAllProductAdmin());
  }, []);

  if (loading) {
    return (
      <div className="progress-bar-product">
        <CircularProgress color="secondary" />
        <h3>Loading product</h3>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h5 className="text-center">--</h5>
        <h3 className="text-center">All Product</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Product Price</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Product Image</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsArray?.map((item, index) => {
                return (
                  <ProductCard key={item._id} index={index + 1} item={item} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default AllProducts;
