import { TableCell, TableRow, Button, ButtonGroup } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import orderHelper from "../../../actions/admin/orderHelper";

function OrderTable({ order, getAllOrders }) {
  // state
  let [showOrderDetails, setShowOrderDetails] = useState(false);
  let [orderDetails, setOrderDetails] = useState({});
  let [address, setAddress] = useState({});
  let [productInfo, setProductInfo] = useState([]);
  let [endStatus, setEndStatus]=useState(" ");

  // mount
  useEffect(() => {
    if (!order) return;
    setOrderDetails(order.orderDetails);
    setProductInfo(order.productInfo);

    if (!orderDetails) return;
    setAddress(orderDetails.address);

    if(!orderDetails.status) return;
    let status=orderDetails.status[orderDetails.status.length-1];
    setEndStatus(status.state);
  }, [order, orderDetails]);

  // actions
  function handleChangeStatus(e){
    let status=e.target.value;
    orderHelper.changeStatus(order.userId, orderDetails._id, status, getAllOrders);
  }

  // test
  // console.log(orderDetails.status[orderDetails.status.length-1]);

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
              <strong>{address?.FullName}</strong>
            </p>
            <p>{address?.Address}</p>
            <p>
              <strong>Phone No. </strong>
              {address?.Mobile}
            </p>
          </div>
          <h5 style={{ textDecoration: "underline", marginTop: "1rem" }}>
            Orderd Items
          </h5>
          <div className="order__items">
            {productInfo.map((item, index) => {
              return (
                <div className="order__items_details">
                  <div className="order__items_img">
                    <img
                      src={item?.productImages?.[0].img}
                      alt=""
                    />
                  </div>
                  <div className="order__items__details">
                    <p>
                      <strong>{item?.name}</strong>
                    </p>
                    <p>₹{item?.price}</p>
                    <p>{item.color}</p>
                    <p>{orderDetails?.products?.[0].quantity} Items</p>
                    <p>{item.brand} Brand</p>
                  </div>
                </div>
              );
            })}
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
        <TableCell align="center">{orderDetails?._id}</TableCell>
        <TableCell align="center">{address?.FullName}</TableCell>
        <TableCell align="center">
          {orderDetails?.products?.length} Item
        </TableCell>
        <TableCell align="center">
          {
            endStatus==="CANCELED"?
            <Form.Select disabled>
              <option>Canceled</option>
            </Form.Select>
            :
          <Form.Select onChange={handleChangeStatus}>
            <option value={endStatus}>{endStatus}</option>
            <option value="CONFIRMED">confirmed</option>
            <option value="PACKED">packed</option>
            <option value="SHIPPED">shipped</option>
            <option value="DELIVERD">deliverd</option>
            <option value="CANCELED">canceled</option>
          </Form.Select>
        }
        </TableCell>
        <TableCell align="center">₹{orderDetails?.totalPrice}</TableCell>
        <TableCell align="center">
          <ButtonGroup>
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
