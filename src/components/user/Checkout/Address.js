import React, { useState } from "react";
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

function Address() {
  let [showAddForm, setAddForm] = useState(false);

  function handleShowAddForm() {
    if (showAddForm) {
      setAddForm(false);
    } else {
      setAddForm(true);
    }
  }

  return (
    <div className="address__main">
      {/* Address table */}
      <div className="address__container">
        <div className="addresss__list">
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
                <TableRow>
                  <TableCell component="th" scope="row">
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell align="center">
                    <strong> Name: </strong>Swaliht,
                    <strong> Mobile: </strong>7034785939,
                    <strong> Pincode: </strong>678900,
                    <strong> Address: </strong>Thaikkaden(h),Kaithachira,
                    <strong> Town: </strong>Mannarkkad,
                    <strong> Landmark: </strong>Linsha Medicals
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell align="center">
                    <strong> Name: </strong>Swaliht,
                    <strong> Mobile: </strong>7034785939,
                    <strong> Pincode: </strong>678900,
                    <strong> Address: </strong>Thaikkaden(h),Kaithachira,
                    <strong> Town: </strong>Mannarkkad,
                    <strong> Landmark: </strong>Linsha Medicals
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
                <Form.Control type="text" placeholder="Enter Fullname" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" placeholder="Enter Mobile No." />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" placeholder="123456" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Landmark</Form.Label>
                <Form.Control placeholder="Near infopark etc." />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Address;
