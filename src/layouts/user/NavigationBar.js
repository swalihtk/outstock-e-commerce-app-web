import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Offcanvas,
  DropdownButton,
} from "react-bootstrap";
import "./NavigationBar.css";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogedIn } from "../../redux/user/logincheckReducer";
import { Link, useNavigate } from "react-router-dom";
import { LinearProgress,  } from "@material-ui/core";
import axios from "axios";
import { getCartItems } from "../../redux/user/cartReducer";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import {Menu,Space } from "antd";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListIcon from "@material-ui/icons/List";
import {Dropdown} from 'react-bootstrap';

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

  // test
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (loading) {
    return <LinearProgress color="secondary" />;
  } else {
    return (
      <div className="navbar__main shadow-sm">
        <ul className="navbar__list">
          <li className="navbar__home_icon">
            <Link to="/">
            <img
              src="http://themepure.net/template/outstock-prv/outstock/assets/img/logo/logo.png"
              alt="#"
            />
            </Link>
          </li>
          <li className="navbar__search_list">
            <div className="navbar__search">
              <input type="text" placeholder="search products.." value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
              <button onClick={searchProductNavigate}>
                <SearchIcon />
              </button>
            </div>
          </li>
         
          {iconShow&&
          <>
            <li className="navbar__myAccount">
            {/* <MyAccountLi /> */}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{background:"none", border:"none", color:"black"}}>
              {
                logedin?
                "My Account"
                :
                <Link style={{fontWeight:"600", background:"#f0f0f0", padding:"3px 20px"}} to="/login">Login</Link>
              }
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <Link to="/profile">
                    <AccountCircleIcon /> My Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                   <Link to={`/orders/${userId}`}>
                    <ListIcon /> My Orders
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/whishlist">
                      <FavoriteBorderIcon /> My Whislist
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                    <Link to="/logout">
                      <ExitToAppIcon /> Logout
                    </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </li>
          <li className="navbar__cart"><Link to="/cart"><ShoppingCartIcon style={{fontSize:"15px",marginLeft:"1rem" }}/> Cart <Badge bg="secondary">{count}</Badge></Link></li>
          </>
          }
          <div className="navbar__offcanvas">
            
            <MenuIcon onClick={handleShow} />
            <Offcanvas
              style={{ width: "50vw" }}
              show={show}
              onHide={handleClose}
              placement="end"
            >
              <Offcanvas.Header style={{ paddingBottom: "0" }} closeButton>
                <Offcanvas.Title style={{ fontSize: "1rem" }}>
                  {logedin ? (
                    "Hello " + userName
                  ) : (
                    <Link to="/login">Login & Signup</Link>
                  )}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <p>
                  <Link to="/profile">
                    <AccountCircleIcon /> My Profile
                  </Link>
                </p>
                <p>
                  <Link to="/cart">
                    <ShoppingCartIcon /> My Cart <Badge bg="secondary">{count}</Badge>
                  </Link>
                </p>
                <hr />
                <p>
                  <Link to="/orders">
                    <ListIcon /> My Orders
                  </Link>
                </p>
                <p>
                  <Link to="/whishlist">
                    <FavoriteBorderIcon /> My Whislist
                  </Link>
                </p>
                <hr />
                {logedin && (
                  <p>
                    <Link to="/logout">
                      <ExitToAppIcon /> Logout
                    </Link>
                  </p>
                )}
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </ul>
                
      </div>
    );
  }
}

function MyAccountLi() {
  let { loading, logedin, userId } = useSelector((state) => state.userLogin);

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <p style={{fontSize:"16px"}}>
                  <Link to="/profile">
                    <AccountCircleIcon /> My Profile
                  </Link>
                </p>
              </Menu.Item>
              <Menu.Item key="2" style={{fontSize:"16px"}}>
                <p>
                  <Link to={`/orders/${userId}`}>
                    <ListIcon /> My Orders
                  </Link>
                </p>
              </Menu.Item>
              <Menu.Item key="3" style={{fontSize:"16px"}}>
                <p>
                  <Link to="/whishlist">
                    <FavoriteBorderIcon /> My Whislist
                  </Link>
                </p>
              </Menu.Item>
              <Menu.Item key="4" style={{fontSize:"16px"}}>
                <p>
                  {
                    logedin&&
                      <Link to="/logout">
                      <ExitToAppIcon /> Logout
                    </Link>
                  }
                  
                </p>
              </Menu.Item>
            </Menu>
          }
          placement="bottomLeft"
        >
          <p style={{ margin: 0 }}>{
            logedin?
            "My Account"
            :
            <Link style={{fontWeight:"600", background:"#f0f0f0", padding:"3px 20px"}} to="/login">Login</Link>
          }</p>
        </Dropdown>
      </Space>
    </Space>
  );
}

export default NavigationBar;
