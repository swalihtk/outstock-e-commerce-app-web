import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

// table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router";

function OrderDetails() {
  let navigate = useNavigate();

  // payment confirmation
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const handleClose = () => setShowOrderConfirm(false);
  const handleShow = () => setShowOrderConfirm(true);

  // handle Payment method
  function handlePayment() {
    navigate("/order/success");
  }

  return (
    <>
      {/* Modal */}

      <Modal show={showOrderConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to confirm order?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="orderDetails__main">
        <div className="orderDetails__coupon text-center mt-4">
          <Button className="btn-light">
            <strong>Have a coupon? </strong>Click here to enter the coupon
          </Button>
        </div>

        <div className="orderDetails__body">
          <h1>Your Order</h1>
          <hr />
          <div className="orderDetails__bodyTable">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Product</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Price</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Demo1
                    </TableCell>
                    <TableCell align="center">₹45,999</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Demo1
                    </TableCell>
                    <TableCell align="center">₹45,999</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Demo1
                    </TableCell>
                    <TableCell align="center">₹45,999</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <div className="orderDetails__total">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <strong>Total Amount</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>₹50,999</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        <div className="order__payment">
          <div className="order__paymentMethod">
            <input type="checkbox" />
            <p>CASH ON DELIVERY</p>
          </div>
          <div className="order__paymentMethod">
            <input type="checkbox" />
            <p>OTHER PAYMENT METHOD</p>
            <br />
          </div>
        </div>
        <div className="order__btn">
          <button onClick={handleShow}>PLACE ORDER</button>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
