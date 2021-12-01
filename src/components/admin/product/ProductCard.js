import { TableCell, TableRow, Button } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { showAllProductAdmin } from "../../../redux/admin/showAllProduct";
import EditProduct from "./EditProduct";
import {getAllOffers} from "../../../redux/admin/offerReducer";
import offerHelper from "../../../actions/admin/offerHelper";

// icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

function ProductCard({ item, index }) {
  // item distructure
  let { _id, name, price, productImages, quantity, category, offer } = item;

  let navigate = useNavigate();

  let [showEditForm, setShowEditForm]=useState(false);
  let [showOfferForm, setShowOfferForm]=useState(false);
  let [offerBody, setOfferBody]=useState({});
  let [showOfferDetails, setShowOfferDetails]=useState(false);

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

  // actions
  function handleOffer(){
    if(!offerBody.offerId) return;
    offerHelper.applyOfferForProducts(_id, offerBody.offerId, offerBody.offerName, offerBody.percentage, offerBody.expires,
    dispatch,setShowOfferForm );
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
      {/* Offer Modal */}
      <Modal
        show={showOfferForm}
        dialogClassName="modal-100w"
        aria-labelledby="hellow"
        size={"lg"}
        onHide={()=>{
          setOfferBody({});
          setShowOfferForm(false)
        }}
      >
        <Modal.Header>
          <Modal.Title id="second">
            APPLY OFFER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AllOffers setOfferBody={setOfferBody}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="primary" onClick={handleOffer}>OK</Button>
        </Modal.Footer>
      </Modal>
      {/* End of Offer Modal */}
      <TableRow>
        <TableCell component="th" scope="row">
          {index}
        </TableCell>
        <TableCell align="center" style={{ width: "30%" }}>
          {name}
        </TableCell>
        <TableCell align="center">₹{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br/>
        {
          offer&&!showOfferDetails&&
          <button style={{border:"none", background:"yellow", borderRadius:"5px", padding:"3px", color:"blue"}} onClick={()=>setShowOfferDetails(true)}>Offer Applied</button>
        }
        {
          offer&&showOfferDetails&&
         <div className="productCard__offerDetail">
           <p><strong>OfferName</strong>: {offer.offerName}</p>
           <p><strong>OfferPrice</strong>: ₹{offer.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
           <p><strong>OfferExpires</strong>: {offer.expireDate}</p>
        </div>
        }
        </TableCell>
        <TableCell align="center">{category}</TableCell>
        <TableCell align="center">{quantity}</TableCell>
        <TableCell align="center">
          <img
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            src={productImages[0].img}
            alt=""
          />
        </TableCell>
        <TableCell align="center">
            <EditIcon style={{color:"blue",stroke:"#444", cursor:"pointer"}} onClick={()=>setShowEditForm(true)}/>
           <DeleteIcon style={{ marginLeft: "0.5rem", color:"red",stroke:"#444",cursor:"pointer" }} onClick={delteProduct}/>
          <LocalOfferIcon style={{ marginLeft: "0.5rem", color:"yellow", stroke:"#444",cursor:"pointer" }} onClick={()=>setShowOfferForm(true)}/>
        </TableCell>
      </TableRow>
    </>
  );
}

function AllOffers({setOfferBody}){

  // states
  let [offersList, setOffersList]=useState([]);
  let [offerLoading, setOfferLoading]=useState(false);
  let [totalItems, setTotalItems]=useState(1);

  // hooks
  let offerRedux=useSelector(state=>state.adminOffer)
  let dispatch=useDispatch();

  // mount
  useEffect(()=>{
      dispatch(getAllOffers());
  }, [])
  useEffect(()=>{
     if(!offerRedux) return;
     setOfferLoading(offerRedux.loading);
     setOffersList(offerRedux.offers); 
     setTotalItems(offerRedux.total);
  }, [offerRedux])
  

  return (
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Offer Name</th>
              <th>Percontage</th>
              <th>Expire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                offersList.map((item, index)=>{
                    let offerBody=JSON.stringify({offerId:item._id,offerName:item.offerName, percentage:item.percentage, expires:item.expireDate})
                    return (
                        <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.offerName}</td>
                        <td>{item.percentage}%</td>
                        <td>{item.expireDate}</td>
                        <td className="offerList__actions">
                          <input type="radio" name="offers" value={offerBody} onChange={()=>{
                            setOfferBody(JSON.parse(offerBody));
                          }}/>
                        </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </Table>
  )
}

export default ProductCard;
