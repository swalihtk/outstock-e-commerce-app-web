import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import accountHelper from '../../../actions/user/accountHelper';
import {useDispatch, useSelector} from 'react-redux';
import {listAllAddress} from "../../../redux/user/addressReducer";
import validationHelper from "../../../utils/validationHelpers";
import {Col, Form, Row, Spinner, Button} from 'react-bootstrap';

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

  // form erros
  let [mobileNuErr, setMobileNuErr]=useState("");
  let [pincodeErr, setPincodeErr]=useState("");

  // hooks
  let dispatch=useDispatch();
  let {userId}=useSelector(state=>state.userLogin)
  let addressRedux = useSelector((state) => state.address);

  // states
  let [addresses, setAddresses] = useState([]);
  let [loading, setLoading] = useState(false);
  let [addressObject, setAddressObject]=useState({});
  let [addressLoading, setAddressLoading]=useState(false);
  let [editFormError, setEditFormError]=useState("");
  let [addressId, setAddressId]=useState("");

  // mount
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

  useEffect(()=>{
    if(!addressObject) return;
    setFullName(addressObject.fullName);
    setMobileNu(addressObject.mobileNu);
    setAddress(addressObject.address);
    setTown(addressObject.town);
    setState(addressObject.state);
    setLandmark(addressObject.landmark);
    setAddressId(addressObject._id);
  }, [addressObject])

  // handle actions
  function handleAddressFormShow(e) {
    e.preventDefault();
    setForEdit(false);
    resetForm();
    setShowAddressForm(true);
  }

  function handleEditFormShow(addressId){
      setForEdit(true);
      setShowAddressForm(true);
      accountHelper.getOneAddress(userId, addressId, setAddressObject, setAddressLoading, setEditFormError);
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
    setAddressId("");
  }

  function handleAddressEdit(e){
      e.preventDefault();
      let body={
        fullName:fullName,
        pincode:pincode,
        address:address,
        town:town,
        state:state,
        landmark:landmark
      }
      accountHelper.updateAddress(userId, addressId, body, setAddressLoading, setFormErr,dispatch, setShowAddressForm);
  }

  function handleDeleteAddress(addressId){
    accountHelper.deleteAddress(userId, addressId, dispatch);
  }

  // test
  // console.log(addressObject);

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
                    onChange={(e) => {
                      validationHelper.phoneInputChangeHandler(e.target.value, setMobileNuErr)
                      setMobileNu(e.target.value)}}
                    onBlur={(e) => {
                        validationHelper.phoneInputBlurHandler(mobileNu, setMobileNuErr)
                      }}
                  />
                  {
                    mobileNuErr&&<span className="text-danger">{mobileNuErr}</span>
                  }
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
                    onChange={(e) => {
                      validationHelper.postalCodeInputChangeHandler(e.target.value, setPincodeErr)
                      setPincode(e.target.value)}}
                      onBlur={(e) => {
                          validationHelper.postalCodeInputBlurHandler(pincode, setPincodeErr)
                        }}
                  />
                  {
                    pincodeErr&&<span className="text-danger">{pincodeErr}</span>
                  }
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
              {editFormError&& <p className="text-danger">{editFormError}</p>}
              <Button
                variant="primary"
                type="submit"
                onClick={forEdit?handleAddressEdit:handleAddressAdd}
              >
                {
                  addressLoading?<Spinner animation="border" size="sm" />
                  :
                  "SUBMIT"
                }
              </Button>
              <Button variant="danger" style={{marginLeft:"1rem"}} onClick={e=>{
                resetForm();
                setShowAddressForm(false);
              }}>Cancell</Button>
            </Form>
          </div>}
        </div>
      </div>
      {showAddressForm===false&&<div className="manageAddress__allAddress">
          {
              addresses.map((item, index)=>{
                  let address=item.address;
                return (
                    <div className="manageAddress__address_container" key={address._id}>
                        <p>
                            <strong>{address.fullName}</strong> <strong>{address.mobileNu}</strong>
                            <br />
                            <span>
                            {address.address}, {address.town}, {address.state} - {address.pincode}
                            </span>
                        </p>
                        <div className="manageAddress__actions">
                            <button style={{background:"blue"}} onClick={(e)=>handleEditFormShow(address._id)}>Edit</button>
                            <button style={{background:"red"}} onClick={(e)=>handleDeleteAddress(address._id)}>Delete</button>
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
