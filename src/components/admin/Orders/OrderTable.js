import { TableCell, TableRow, Button, ButtonGroup } from "@material-ui/core";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";

function OrderTable() {
  let [showOrderDetails, setShowOrderDetails] = useState(false);
  return (
    <>
      {/* Modal */}
      <Modal
        show={showOrderDetails}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textDecoration: "underline" }}>Billing Address</h5>
          <div className="order__shiping">
            <p>
              <strong>Swalih t</strong>
            </p>
            <p>Thaikkaden(h),Kaithachira (PO),Mannarkkad-678900, Kerala</p>
            <p>
              <strong>Phone No. </strong>7034785939
            </p>
          </div>
          <h5 style={{ textDecoration: "underline", marginTop: "1rem" }}>
            Orderd Items
          </h5>
          <div className="order__items">
            <div className="order__items_details">
              <div className="order__items_img">
                <img
                  src="https://res.cloudinary.com/da9w4jcnl/image/upload/v1637259191/Outstock%20E-Commerce%20web%20app/obope4oz5mcqeryujvtw.jpg"
                  alt=""
                />
              </div>
              <div className="order__items__details">
                <p>
                  <strong>HP Pavilon</strong>
                </p>
                <p>₹34,999</p>
                <p>Red Color</p>
                <p>2 Items</p>
                <p>Nike Brand</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowOrderDetails(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Table */}
      <TableRow key={"1"}>
        <TableCell component="th" scope="row">
          {"1"}
        </TableCell>
        <TableCell align="center">443ef343ee8</TableCell>
        <TableCell align="center">swaliht</TableCell>
        <TableCell align="center">1 Item</TableCell>
        <TableCell align="center">
          <Form.Select aria-label="Default select example">
            <option value="1">Orderd</option>
            <option value="1">Shipped</option>
            <option value="2">Packed</option>
            <option value="3">Deliverd</option>
          </Form.Select>
        </TableCell>
        <TableCell align="center">₹29,999</TableCell>
        <TableCell align="center">
          <ButtonGroup>
            <Button variant="contained" color="secondary">
              Cancel Order
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setShowOrderDetails(true);
              }}
              color="primary"
            >
              Show Order
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </>
  );
}

export default OrderTable;
