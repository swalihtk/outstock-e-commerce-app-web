import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAllProductAdmin } from "../../../redux/admin/showAllProduct";
import ProductCard from "./ProductCard";
import "../style.css";
import SearchIcon from '@material-ui/icons/Search';

// product table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CircularProgress, Button } from "@material-ui/core";
import productHelper from "../../../actions/admin/productHelper";
import { Modal } from "react-bootstrap";
import ProductCreate from "./ProductCreate";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AllProducts({mainCatValue,setMainCatValue,setTotalCount,sort,setSort,serachName,setSearchName,}) {
  const classes = useStyles();

  // product redux
  let { loading, error, productsArray, totalItem } = useSelector(
    (state) => state.productListAdmin
  );
  let dispatch = useDispatch();

  // states
  let [allProducts, setAllProducts] = useState([]);
  let [mainCategory, setMainCategory] = useState([]);

  // mount
  useEffect(() => {
    dispatch(showAllProductAdmin(1, mainCatValue, serachName, sort));
  }, [mainCatValue, sort, serachName]);

  useEffect(() => {
    if (!productsArray) return;
    setAllProducts(productsArray);

    if (!totalItem) return;
    setTotalCount(totalItem);
  }, [productsArray]);

  useEffect(() => {
    productHelper.getMainCategory(setMainCategory);
  }, []);

  // actions
  function paginationHandler(e) {
    dispatch(
      showAllProductAdmin(e.target.textContent, mainCatValue, serachName, sort)
    );
  }
  function categoryFilterHandler(e) {
    setMainCatValue(e.target.value);
  }

  let [showAddProduct,setShowAddProduct]=useState(false);


  return (
    <>
    <Modal
        show={showAddProduct}
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
          <ProductCreate setShowAddProduct={setShowAddProduct}/>
        </Modal.Body>
      </Modal>
    <div className="container" style={{position:"relative"}}>
      <h5 className="text-center">--</h5>
      <h3 className="text-left">All Product</h3>
      <div className="createProduct__btn">
          <Button variant="contained" size="small" onClick={(e)=>setShowAddProduct(true)}>Add New Product</Button>
      </div>
      {/* <ProductFilter /> */}
      <div className="d-flex">
        <select
          style={{ padding: "3px 50px" }}
          onChange={categoryFilterHandler}
          className="category_selector"
        >
          <option value="">All</option>
          {mainCategory.map((item) => (
            <option key={item._id} value={item.categoryName}>
              {item.categoryName}
            </option>
          ))}
        </select>
        <div className="sort_button">
          <button onClick={() => (sort == -1 ? setSort(1) : setSort(-1))}>
            {sort == -1 ? "Sort" : "UnSort"}
          </button>
        </div>
        <div className="search_input">
          <input type="text" value={serachName} onChange={(e)=>setSearchName(e.target.value)} />
          <SearchIcon/>
        </div>
      </div>
      {loading ? (
        <div className="progress-bar-product">
          <CircularProgress color="secondary" />
          <h3>Loading product</h3>
        </div>
      ) : (
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
              {allProducts?.map((item, index) => {
                return (
                  <ProductCard key={item._id} index={index + 1} item={item} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
    </>
  );
}

export default AllProducts;
