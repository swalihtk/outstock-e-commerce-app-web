import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Badge, Spinner } from "react-bootstrap";
import Users from "./Users";

// table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pagination } from "antd";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ListUsers() {
  const classes = useStyles();

  // loading
  let [loading, setLoading] = useState(true);

  // active users
  let [activeList, setActiveList] = useState([]);

  // list users
  let [headerText, setHeaderText] = useState("Active Users");
  let [listUsers, setListUsers] = useState([]);
  let [blocked, setBlocked] = useState(false);

  function getActiveUsers() {
    setLoading(true);
    axios
      .get("/admin/users/active")
      .then((response) => {
        setActiveList(response.data);
        setListUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setListActive() {
    setHeaderText("Active Users");
    setListUsers(activeList);
    setBlocked(false);
  }

  // blocked users
  let [blockedList, setBlockedList] = useState([]);

  function getBlockedUsers() {
    setLoading(true);
    axios
      .get("/admin/users/blocked")
      .then((response) => {
        setBlockedList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setListBlocked() {
    setListUsers(blockedList);
    setHeaderText("Blocked Users");
    setBlocked(true);
  }

  // component did mount
  useEffect(() => {
    // active Users
    getActiveUsers();
    // blocked Users
    getBlockedUsers();
  }, []);

  if (loading) {
    return (
      <Button variant="primary" style={{ marginLeft: "3rem" }} disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    );
  } else {
    return (
      <div className="listUsers">
        <div className="listUsers-nav">
          <Button variant="primary" onClick={setListActive}>
            Active Users <Badge bg="secondary">{activeList.length}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
          <Button variant="danger" onClick={setListBlocked}>
            Blocked Users <Badge bg="secondary">{blockedList.length}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
        </div>
        <div className="listUsers-table container">
          <h3 className="text-center mt-3">{headerText}</h3>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Updated At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUsers &&
                  listUsers.map((user, index) => {
                    return (
                      <Users
                        key={user._id}
                        blocked={blocked}
                        getActiveUsers={getActiveUsers}
                        getBlockedUsers={getBlockedUsers}
                        setListBlocked={setListBlocked}
                        setListActive={setListActive}
                        user={user}
                        index={index + 1}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Pagination
            style={{ marginTop: "1rem" }}
            defaultCurrent={1}
            total={50}
          /> */}
        </div>
      </div>
    );
  }
}

export default ListUsers;
