import React, { useEffect, useState } from "react";
import AdminDashboard from "../../../layouts/admin/AdminDashboard";
import "./Orders.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import OrderTable from "./OrderTable";
import { Pagination } from "antd";
import orderHelper from "../../../actions/admin/orderHelper";
import { useSearchParams, useNavigate } from "react-router-dom";
import {Placeholder} from "react-bootstrap"

function Index() {

  // state
  let [allOrders, setAllOrders]=useState([]);
  let [totalOrders, setTotalOrders]=useState(0);
  let [loading,setLoading]=useState(false);
  let [defaultPage, setDefaultPage]=useState(1);

  // hooks
  let navigate=useNavigate();

  // query
  let [searchParams,setSearchParams]=useSearchParams();
  let pageNu=searchParams.get("page");

  // mount
  useEffect(()=>{
    getAllOrders();
  }, [searchParams])

  // actions
  function handlePageChange(e){ 
    navigate(`/admin/orders?page=${e}`)
  }

  function getAllOrders(){
    setDefaultPage(pageNu);
    orderHelper.listAllOrders(pageNu, setAllOrders, setTotalOrders, setLoading);
  }

  // test
  //console.log(allOrders, totalOrders);

  return (
    <>
      <AdminDashboard>
        <div className="Orders__main container">
          <h1>All Orders</h1>
          {
            loading?
            // <h1>Loading</h1>
            (
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            )
            :
            <>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>#</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Order Id</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Username</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Purchased</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  allOrders.length>0?
                    allOrders.map((item, index)=>{
                      return <OrderTable index={index+1} key={index} order={item} getAllOrders={getAllOrders}/>
                    })
                  :
                  <TableRow>
                    <h1>No orders found</h1>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            style={{ marginTop: "1rem" }}
            defaultCurrent={defaultPage}
            total={(totalOrders/10)*10}
            onChange={handlePageChange}
          />
          </>
          }
        </div>
      </AdminDashboard>
    </>
  );
}

export default Index;
