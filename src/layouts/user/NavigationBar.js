import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Badge,
} from "react-bootstrap";
import "./NavigationBar.css";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogedIn } from "../../redux/user/logincheckReducer";
import { Link, useNavigate } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import MenuIcon from "@material-ui/icons/Menu";
import { getCartItems } from "../../redux/user/cartReducer";

let linkStyle = {
  textDecoration: "none",
  color: "#000000",
};

function NavigationBar({ iconShow }) {
  let { loading, logedin, userId } = useSelector((state) => state.userLogin);
  let { count } = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  let [searchText, setSearchText] = useState("");

  // userDetails
  let [userName, setUserName] = useState("");

  // navigate
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(isUserLogedIn());

    if (userId) {
      axios
        .get(`/user/account/details/${userId}`)
        .then((response) => {
          let data = response.data;
          setUserName(data.username);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    dispatch(getCartItems(userId));

    return () => {
      setUserName("");
    };
  }, [dispatch]);

  // search
  function searchProductNavigate(e) {
    e.preventDefault();
    if (!searchText) {
      return;
    }

    navigate(`/search?product=${searchText}`);
  }

  if (loading) {
    return <LinearProgress color="secondary" />;
  } else {
    return (
      <nav>
        <Navbar bg="light" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                src="http://themepure.net/template/outstock-prv/outstock/assets/img/logo/logo.png"
                alt="#"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link className="nav-home"></Nav.Link> */}
                {iconShow && (
                  <>
                    <Form
                      className="d-flex nav__search"
                      style={{ width: "40vw", marginLeft: "2rem" }}
                      onSubmit={searchProductNavigate}
                    >
                      <FormControl
                        type="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>

                    <Nav className="nav-link">
                      <Link to={logedin ? "/cart" : "login"} style={linkStyle}>
                        Cart <Badge bg="secondary">{count}</Badge>
                      </Link>
                    </Nav>
                    <NavDropdown
                      title={<PersonIcon />}
                      className="navbar-collapse-icon"
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item
                        as={Link}
                        to={logedin ? "/myaccount" : "login"}
                      >
                        My Account
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={logedin ? `/orders/${userId}` : "login"}
                      >
                        Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={logedin ? "/whislist" : "login"}
                      >
                        Whishlist
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>Contact</NavDropdown.Item>
                    </NavDropdown>
                    <Navbar.Text className="navbar-text">
                      {logedin ? userName : "Guest"}
                    </Navbar.Text>
                    <Nav className="nav-link">
                      <Link
                        to={logedin ? "/logout" : "/login"}
                        style={linkStyle}
                      >
                        {logedin ? "Logout" : "Login"}
                      </Link>
                    </Nav>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
    );
  }
}

export default NavigationBar;
