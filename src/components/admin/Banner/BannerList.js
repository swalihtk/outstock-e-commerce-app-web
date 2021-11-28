import React, { useState, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Modal, Placeholder, Spinner } from "react-bootstrap";
import BannerAddForm from "./BannerAddForm";
import bannerHelper from "../../../actions/admin/bannerHelper";

function BannerList() {
  // state
  let [addFormShow, setAddFormShow] = useState(false);
  let [allBanners, setAllBanners] = useState([]);
  let [sort, setSort] = useState(-1);
  let [pageNum, setPageNum] = useState(1);
  let [bannersLength, setBannersLength] = useState(1);
  let [bannerLoading, setBannerLoading] = useState(false);
  let [deleteLoading, setDeleteLoading]=useState(false);

  // mount
  useEffect(() => {
    if(addFormShow) return;

    bannerHelper.getAllBanners(
      pageNum,
      sort,
      setBannersLength,
      setAllBanners,
      setBannerLoading
    );
  }, [addFormShow]);

  // action
  function handleAddBanner() {
    // setAddFormShow(true);
    setAddFormShow(true);
  }

  function getAllBanners(){
    bannerHelper.getAllBanners(pageNum,sort,setBannersLength,setAllBanners,setBannerLoading);
  }

  function deleteBanner(bannerId){
    bannerHelper.deleteBanner(bannerId, setDeleteLoading, getAllBanners);
  }

  // test
  // console.log(allBanners);

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
          <BannerAddForm setAddFormShow={setAddFormShow}/>
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
          <Button color="primary" size="small" onClick={handleAddBanner} variant="contained">
            Add New Banner
          </Button>
        </div>
        {
          bannerLoading?
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          :
          allBanners.length<=0?
          <h5>No banners found</h5>
          :
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
              {allBanners.map((item, index) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                      {index+1}
                    </TableCell>
                    <TableCell align="center">
                      <div className="bannerList__image">
                        <img
                          src={item.poster_image}
                          alt=""
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">{item.title}</TableCell>
                    <TableCell align="center">
                      <a href={item.link}>
                        {item.link}
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" onClick={(e)=>deleteBanner(item._id)} color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        }
      </div>
    </>
  );
}

export default BannerList;
