import React, { useEffect, useState } from "react";
import {Table, Modal, Button, Placeholder} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../../redux/admin/offerReducer";
import offerHelper from "../../../actions/admin/offerHelper";

function AllOffers() {

    // states
    let [offersList, setOffersList]=useState([]);
    let [offerLoading, setOfferLoading]=useState(false);
    let [totalItems, setTotalItems]=useState(1);
    const [show, setShow] = useState(false);
    let [isForEditing, setIsForEditing]=useState(false);
    let [offerDetails,setOfferDetails]=useState({hello:"hello"});

    // form states
    let [offerName, setOfferName]=useState("..");
    let date=new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear();
    let [expireDate, setExpireDate]=useState("hello world");
    let [percentage, setPercentage]=useState(10);
    let [offerId,setOfferId]=useState("");

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
    useEffect(()=>{
        if(!offerDetails)return;

        setOfferName(offerDetails.offerName);
        setExpireDate(offerDetails.expireDate);
        setPercentage(offerDetails.percentage);
    }, [offerDetails])

    // actions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // actions form
    function handleFormCreate(e){
        e.preventDefault();

        if(!offerName || !expireDate || !percentage) return;
        let body={
            offerName:offerName,
            expireDate:expireDate,
            percentage:percentage
        }
        offerHelper.createOffer(body, setShow, dispatch);
    }

    function handleDelete(offerId){
        offerHelper.deleteOffer(offerId, dispatch);
    }

    function handleEdit(offerId){
        handleShow();
        setIsForEditing(true);
        setOfferId(offerId);
        offerHelper.editDetailsGet(offerId, setOfferDetails);
    }

    function handleFormUpdate(){
        let body={
            offerName:offerName,
            expireDate:expireDate,
            percentage:percentage
        }
        offerHelper.updateDetails(offerId, body, dispatch, setShow);
    }
    
  return (
      <>
      <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {isForEditing?
            "EDIT OFFER"
            :
            "CREATE NEW OFFER"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="allOffers__form" onSubmit={handleFormCreate}>
            <label>Offer name</label>
            <input type="text" value={offerName} onChange={e=>setOfferName(e.target.value)}/>
            <label>Expire Date</label>
            <input type="date" value={expireDate} onChange={e=>setExpireDate(e.target.value)}/>
            <label>Offer Percentage</label>
            <input type="number" value={percentage} max={"100"} min={"1"} onChange={e=>setPercentage(e.target.value)}/>
            {
            isForEditing?
            <button type="button" onClick={handleFormUpdate}>UPDATE</button>
            :
            <button type="submit">CREATE</button>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>

    <div className="allOffers__main">
      <div className="allOffers__title">
        <h1>All Offers</h1>
        <button onClick={()=>{
             setOfferName("");
            setExpireDate("");
            setPercentage("");
            setIsForEditing(false);
            handleShow();
            }}>ADD NEW OFFER</button>
      </div>
      <div className="allOffers__list container">
       {
       offerRedux.loading?
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
       :
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
                    return (
                        <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.offerName}</td>
                        <td>{item.percentage}%</td>
                        <td>{item.expireDate}</td>
                        <td className="offerList__actions">
                            <button style={{background:"blue", color:"whitesmoke"}} onClick={()=>handleEdit(item._id)}>Edit</button>
                            <button style={{background:"red", color:"white"}} onClick={()=>handleDelete(item._id)}>Delete</button>
                        </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </Table>}
      </div>
    </div>
    </>
  );
}

export default AllOffers;
