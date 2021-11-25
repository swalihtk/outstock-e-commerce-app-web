import React from "react";
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

function index() {
  return (
    <>
      <AdminDashboard>
        <div className="Orders__main container">
          <h1>All Orders</h1>
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
                <OrderTable />
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            style={{ marginTop: "1rem" }}
            defaultCurrent={1}
            total={500}
          />
        </div>
      </AdminDashboard>
    </>
  );
}

export default index;
