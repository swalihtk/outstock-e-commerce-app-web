import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Form, Col, Row, Button } from "react-bootstrap";
import accountHelper from '../../../actions/user/accountHelper';
import {useDispatch, useSelector} from 'react-redux';
import {listAllAddress} from "../../../redux/user/addressReducer";

function ManageAddress() {
  // address form states
  let [fullName, setFullName] = useState("");
  let [mobileNu, setMobileNu] = useState("");
  let [pincode, setPincode] = useState("");
  let [address, setAddress] = useState("");
  let [town, setTown] = useState("");
  let [state, setState] = useState("");
  let [landmark, setLandmark] = useState("");
  let [formErr, setFormErr] = useState("");
  let [submitErr, setSubmitErr] = useState("");
  let [showAddressForm, setShowAddressForm] = useState(false);
  let [forEdit, setForEdit]=useState(false);

  // hooks
  let dispatch=useDispatch();
  let {userId}=useSelector(state=>state.userLogin)
  let addressRedux = useSelector((state) => state.address);

  // states
  let [addresses, setAddresses] = useState([]);
  let [loading, setLoading] = useState(false);

  // mounte
  useEffect(() => {
    if(addressRedux.address){
      setAddresses(addressRedux.address);
    }
    setLoading(addressRedux.loading);
  }, [addressRedux]);

  useEffect(()=>{
    if(!userId) return;
    dispatch(listAllAddress(userId));
  }, [userId])

  // handle actions
  function handleAddressFormShow(e) {
    e.preventDefault();
    setForEdit(false);
    setShowAddressForm(true);
  }

  function handleEditFormShow(e){
      e.preventDefault();
      setForEdit(true);
      setShowAddressForm(true);
  }

  function handleAddressAdd(e){
      e.preventDefault();
      if(!fullName || !mobileNu || !pincode || !address || !town || !state || !landmark){
        setFormErr("You need to fill all fields!!");
        return;
    }
    setFormErr("");
    let body={
      userId,
      fullName,
      mobileNu,
      pincode,
      address,
      town,
      state,
      landmark
    }
    accountHelper.addressAdd(body, dispatch, setShowAddressForm, resetForm,setSubmitErr)
  }
  // reset form
  function resetForm(){
    setFullName("");
    setMobileNu("");
    setPincode("");
    setAddress("");
    setTown("");
    setState("");
    setLandmark("");
  }

  function handleAddressEdit(e){
      e.preventDefault();
  }

  // test
  console.log(addresses)

  return (
    <div className="manageAddress__main">
      <h1>Manage Addresses</h1>
      <div className="manageAddress__newAddress">
        <div className="manageAddress__addBtn" onClick={handleAddressFormShow}>
          <button>
            <AddIcon /> ADD NEW ADDRESS
          </button>
        </div>

        <div className="manageAddress__form">
          {showAddressForm&&<div className="address__form" style={{marginTop:"1rem"}}>
            <h1 style={{margin:"0"}}>{forEdit?"EDIT ADDRESS":"ADD NEW ADDRESS"}</h1>
            <Form style={{marginTop:"5px"}}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>FullName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile No."
                    value={mobileNu}
                    onChange={(e) => setMobileNu(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123456"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Landmark</Form.Label>
                  <Form.Control
                    placeholder="Near infopark etc."
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="Kerala">Kerala</option>
                    <option value="Thamizhnad">Thamizhnad</option>
                    <option value="Karnataka">Karnataka</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              {formErr && <p className="text-danger">{formErr}</p>}
              {submitErr && <p className="text-danger">{submitErr}</p>}
              <Button
                variant="primary"
                type="submit"
                onClick={forEdit?handleAddressEdit:handleAddressAdd}
              >
                Submit
              </Button>
              <Button variant="danger" style={{marginLeft:"1rem"}} onClick={e=>setShowAddressForm(false)}>Cancell</Button>
            </Form>
          </div>}
        </div>
      </div>
      {showAddressForm===false&&<div className="manageAddress__allAddress">
          {
              addresses.map((item, index)=>{
                  let address=item.address;
                return (
                    <div className="manageAddress__address_container" key={item._id}>
                        <p>
                            <strong>{address.fullName}</strong> <strong>{address.mobileNu}</strong>
                            <br />
                            <span>
                            {address.address}, {address.town}, {address.state} - 67852
                            </span>
                        </p>
                        <div className="manageAddress__actions">
                            <button style={{background:"blue"}} onClick={handleEditFormShow}>Edit</button>
                            <button style={{background:"red"}}>Delete</button>
                        </div>
                    </div>
                  )
              })
          }
      </div>}
    </div>
  );
}

export default ManageAddress;
