import React, { useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Modal } from "react-bootstrap";
import BannerAddForm from "./BannerAddForm";

function BannerList() {
  // handle add banner
  let [addFormShow, setAddFormShow] = useState(false);

  function handleAddBanner() {
    // setAddFormShow(true);
    setAddFormShow(true);
  }

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={addFormShow}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BannerAddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setAddFormShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="bannerList__main container">
        <div className="bannerList__title">
          <h1>All Banners</h1>
          <Button color="primary" onClick={handleAddBanner} variant="contained">
            Add New Banner
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>#</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Image</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Title</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Link</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={"1"}>
                <TableCell component="th" scope="row">
                  {"1"}
                </TableCell>
                <TableCell align="center">
                  <div className="bannerList__image">
                    <img
                      src="https://res.cloudinary.com/da9w4jcnl/image/upload/v1637059596/Outstock%20E-Commerce%20web%20app/qnjacdarwa3lczxahtwy.jpg"
                      alt=""
                    />
                  </div>
                </TableCell>
                <TableCell align="center">Third Slide Label</TableCell>
                <TableCell align="center">
                  <a href="https://www.google.com">https://www.google.com</a>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default BannerList;
