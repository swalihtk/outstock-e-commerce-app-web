import React, { useEffect, useState } from "react";
import couponAction from "../../../actions/admin/couponAction";
import {Placeholder, Table, Modal, Button, Spinner} from 'react-bootstrap';

function AllCoupons() {
  
   // ************ list coupons **********
  let [couponsList, setCouponList] = useState([]);
  let [couponLoading, setCouponLoading] = useState(false);
  let [pageNu, setPageNu] = useState(1);
  useEffect(() => {
    listAllCoupons();
  }, []);
  function listAllCoupons() {
    couponAction.listAllCoupons(setCouponLoading, pageNu, setCouponList);
  }
  
  // ************* create coupons *********
  let [creating, setCreating]=useState(false);
  let [couponCode, setCouponCode]=useState("");
  let [expires, setExpires]=useState("");
  let [discount, setDiscount]=useState(10);
  let [showCreateForm, setShowCreateForm]=useState(false);
  let [createFormErr, setCreateFormErr]=useState("");

  function handleCreateForm(e){
    e.preventDefault();
    if(!couponCode || !expires || !discount){
        setCreateFormErr("You need to fill all fields!!");
        return;
    }

    setCreateFormErr("");
    let body={couponCode, expires, discount};
    couponAction.createNewCoupon(setCreating, body, setCreateFormErr, listAllCoupons, handleCreateFormClose);
  }

  function handleCreateFormClose(){
      setCouponCode("");
      setExpires("");
      setDiscount(10);
      setShowCreateForm(false);
  }

  // *************** edit coupons ***********
  let [editing, setEditing]=useState(false);
  let [editFormErr, setEditFormErr]=useState("");
  let [showEditForm, setShowEditForm]=useState(false);
  let [editId, setEditId]=useState("");
  let [editModalLoading, setEditModalLoading]=useState(false);
  let [couponDetails, setCouponDetails]=useState(undefined);
  let [editExpires, setEditExpires]=useState("");
  let [editDiscount, setEditDiscount]=useState(0);

  useEffect(()=>{
    if(!couponDetails) return;
    setEditDiscount(couponDetails?.discount);
    setEditExpires(couponDetails?.expires);
  }, [couponDetails])

  function showEditFormHandler(id){
    setShowEditForm(true);
    setEditId(id);
    couponAction.getOneCoupon(setEditModalLoading, id, setCouponDetails, showEditFormFalse);
  }
  function showEditFormFalse(){
      setEditDiscount(" ");
      setEditExpires(" ");
      setShowEditForm(false);
  }

  function handleEditForm(e){
    e.preventDefault();
    if(!editId || !editExpires || !editDiscount){
        setEditFormErr("Please fill all field!!");
        return;
    }

    setEditFormErr("");
    let body={
        id:editId,
        expires:editExpires,
        discount:editDiscount
    }
    couponAction.editCoupon(setEditing, body, setEditFormErr, listAllCoupons, setShowEditForm, setEditId);
  }


  // *********** delete coupons *************
  let [deleting, setDeleting]=useState(false);
  
  function deleteHandler(id){
      if(!id) return;
      couponAction.deleteCoupon(setDeleting, id, listAllCoupons);
  }

  return (
    <>
    {/* Create Modal */}
    <Modal
      show={showCreateForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            CREATE NEW COUPON
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="allOffers__form" onSubmit={handleCreateForm}>
            <label>Coupon Code</label>
            <input type="text" value={couponCode} onChange={e=>setCouponCode(e.target.value)}/>
            <label>Expire Date</label>
            <input type="date" value={expires} onChange={e=>setExpires(e.target.value)}/>
            <label>Discount</label>
            <input type="number" value={discount} max={"100"} min={"1"} onChange={e=>setDiscount(e.target.value)}/>
            {
                creating?
                <Spinner animation="border" className="mt-3" variant="success" />
                :
                <button type="submit">CREATE</button>
            }
            {createFormErr&&<span className="text-danger">{createFormErr}</span>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCreateFormClose}>Close</Button>
      </Modal.Footer>
    </Modal>
    {/* End of create modal */}

    {/* Edit Modal */}
    <Modal
      show={showEditForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            EDIT COUPON
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
        editModalLoading?
        <form className="allOffers__form">
            <label>Expires</label>
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
            </Placeholder>
            <label>Discount</label>
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
            </Placeholder>
        </form>
        :
        <form className="allOffers__form" onSubmit={handleEditForm}>
            <label>Expires</label>
            <input type="date" value={editExpires} onChange={e=>setEditExpires(e.target.value)}/>
            <label>Discount</label>
            <input type="number" value={editDiscount} max={"100"} min={"1"} onChange={e=>setEditDiscount(e.target.value)}/>
            {
            editing?
            <Spinner animation="border" variant="primary" className="mt-4" />
            :    
            <button type="submit">UPDATE</button>}
        </form>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setShowEditForm(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    {/* End of edit modal */}

    <div className="allCoupons__main">
      <div className="allOffers__title">
        <h1>All Coupons</h1>
        <button onClick={()=>setShowCreateForm(true)}>
          ADD NEW COUPON
        </button>
      </div>
      <div className="allOffers__list container">
        {
        couponLoading?
        <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
        </Placeholder>
        :    
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Discount</th>
              <th>Expires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
            couponsList.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.couponCode}</td>
                  <td>{item.discount}%</td>
                  <td>{item.expires}</td>
                  <td className="offerList__actions">
                    <button
                      style={{ background: "blue", color: "whitesmoke" }}
                      onClick={()=>showEditFormHandler(item._id)}
                      >
                      Edit
                    </button>
                    {
                        deleting?
                        <Spinner animation="border" size="sm" variant="danger" style={{marginLeft:"1rem"}}/>
                        :
                        <button
                        style={{ background: "red", color: "white" }}
                        onClick={()=>deleteHandler(item._id)}
                        >
                        Delete
                        </button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>}
      </div>
    </div>
    </>
  );
}

export default AllCoupons;
