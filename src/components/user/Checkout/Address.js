import React, { useEffect, useState } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";

// table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";

// helpers
import accountHelper from "../../../actions/user/accountHelper";

function Address({userId, setAddressState}) {
  // address redux
  let addressRedux = useSelector((state) => state.address);

  // states
  let [addresses, setAddresses] = useState([]);
  let [loading, setLoading] = useState(false);
  let [showAddForm, setAddForm] = useState(false);

  // address form states
  let [fullName, setFullName]=useState("");
  let [mobileNu, setMobileNu]=useState("");
  let [pincode, setPincode]=useState("");
  let [address, setAddress]=useState("");
  let [town, setTown]=useState("");
  let [state, setState]=useState("");
  let [landmark, setLandmark]=useState("");
  let [formErr, setFormErr]=useState("");
  let [submitErr, setSubmitErr]=useState("");

  // checkbox state
  let [isChecked, setIsChecked]=useState(false);


  // hooks
  let dispatch=useDispatch();

  // useEffects
  useEffect(() => {
    if(addressRedux.address){
      setAddresses(addressRedux.address);
    }
    setLoading(addressRedux.loading);
  }, [addressRedux]);

  // actions
  function handleShowAddForm() {
    if (showAddForm) {
      setAddForm(false);
    } else {
      setAddForm(true);
    }
  }

  // function address add
  function addNewAddress(e){
    e.preventDefault()
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
    accountHelper.addressAdd(body, dispatch, setAddForm, resetForm, setSubmitErr);
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

  // check checkbox
  function checkboxHandler(e){
    let address=JSON.parse(e.target.value);
    
    if(!e.target.checked) return;
    setAddressState(address);
  }

  // test
 

  return (
    <div className="address__main">
      {/* Address table */}
      <div className="address__container">
        <div className="addresss__list">
          <form className="demo">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>#</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Address</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addresses.length > 0 ? (
                  addresses.map((item, index) => {
                    let address=item.address;
                    let addressBody={
                      FullName:address.fullName,
                      Mobile:address.mobileNu,
                      Pincode:address.pincode,
                      Address:address.address,
                      Town:address.town,
                      Landmark:address.landmark
                    }
                    return (
                      <TableRow key={address._id}>
                        <TableCell component="th" scope="row">
                          <input type="radio" name="quizOption" onClick={checkboxHandler} value={JSON.stringify(addressBody)}/>
                        </TableCell>
                        <TableCell align="center">
                          <strong> Name: </strong>{address.fullName},
                          <strong> Mobile: </strong>{address.mobileNu},
                          <strong> Pincode: </strong>{address.pincode},
                          <strong> Address: </strong>{address.address},
                          <strong> Town: </strong>{address.town},
                          <strong> Landmark: </strong>{address.landmark}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                        <TableCell component="th" scope="row">
                          Not found
                        </TableCell>
                        <TableCell align="center">
                          <h6>No addresses found!!</h6>
                        </TableCell>
                      </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          </form>
        </div>
      </div>
      <hr />
      {/* Address form */}
      <Button
        onClick={handleShowAddForm}
        className={showAddForm ? "btn-danger" : "btn-primary"}
      >
        {showAddForm ? "CANCEL" : "ADD NEW ADDRESS"}
      </Button>
      {showAddForm && (
        <div className="address__form">
          <h1>ADD NEW ADDRESS</h1>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>FullName</Form.Label>
                <Form.Control type="text" placeholder="Enter Fullname" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" placeholder="Enter Mobile No." value={mobileNu} onChange={(e)=>setMobileNu(e.target.value)}/>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" placeholder="123456" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" value={town} onChange={(e)=>setTown(e.target.value)}/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Landmark</Form.Label>
                <Form.Control placeholder="Near infopark etc." value={landmark} onChange={(e)=>setLandmark(e.target.value)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose..." value={state} onChange={(e)=>setState(e.target.value)}>
                  <option value="Kerala">Kerala</option>
                  <option value="Thamizhnad">Thamizhnad</option>
                  <option value="Karnataka">Karnataka</option>
                </Form.Select>
              </Form.Group>
            </Row>
            {formErr&&<p className="text-danger">{formErr}</p>}
            {submitErr&&<p className="text-danger">{submitErr}</p>}
            <Button variant="primary" type="submit" onClick={addNewAddress}>
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Address;
