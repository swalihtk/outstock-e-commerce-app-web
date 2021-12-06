import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import swal from "sweetalert";
import axios from "axios";
import {Modal, Spinner, Table} from 'react-bootstrap';
import {useDispatch,useSelector } from 'react-redux'; 
import { getAllOffers } from "../../../redux/admin/offerReducer";
import offerActions from "../../../actions/admin/offerHelper";

function SubCategory({ item, index, mainCatValue, getSubCategory }) {
  // set edit and filed
  let [isEditing, setIsEditing] = useState(false);
  function editingHandler() {
    setIsEditing(true);
  }

  // editing form handler
  let [editText, setEditText] = useState(item);
  let [showOfferForm, setShowOfferForm] = useState(false);
  let [offerBody, setOfferBody] = useState({});
  let [showOfferDetails, setShowOfferDetails] = useState(false);
  let [offerLoading, setOfferLoading]=useState(false);

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

  // offer action
  function handleOffer(){
    if(!offerBody) return;
    let {offerName, offerId, percentage, expires}=offerBody;
    offerActions.applyOfferForCategory(mainCatValue, item, offerName, offerId, expires, percentage, setOfferLoading, setShowOfferForm);
  }

  return (
    <>
      {/* Offer Modal */}
      <Modal
        show={showOfferForm}
        dialogClassName="modal-100w"
        aria-labelledby="hellow"
        size={"lg"}
        onHide={() => {
          setOfferBody({});
          setShowOfferForm(false);
        }}
      >
        <Modal.Header>
          <Modal.Title id="second">APPLY OFFER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AllOffers setOfferBody={setOfferBody} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="primary" onClick={handleOffer}>
            {
              offerLoading?
              <Spinner animation="border" size="sm"/>
              :
              "Ok"
            }
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End of Offer Modal */}
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
            size="small"
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
            size="small"
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              marginLeft: "1rem",
              marginTop: "0.3rem",
              backgroundColor: "yellow",
              color: "blue",
            }}
            onClick={()=>setShowOfferForm(true)}
          >
            Offer
          </Button>
        </td>
      </tr>
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


export default SubCategory;
