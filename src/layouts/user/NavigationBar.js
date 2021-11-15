import React, { useEffect, useState } from 'react'
import { Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import './NavigationBar.css';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLogedIn } from '../../redux/user/logincheckReducer';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import axios from 'axios';

let linkStyle={
    textDecoration:"none",
    color:"#000000"
}

function NavigationBar({iconShow}) {

    let {loading, logedin, userId}=useSelector(state=>state.userLogin);
    let dispatch=useDispatch();

    // userDetails
    let [userName, setUserName]=useState("");

    useEffect(()=>{
        dispatch(isUserLogedIn());

        if(userId){
            axios.get(`/user/account/details/${userId}`,).then(response=>{
                let data=response.data;
                setUserName(data.username);
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [])


    if(loading){
        return (
            <LinearProgress color="secondary" />
        )
    }else{
        return (
            <nav>
                <Navbar bg="light" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Brand href="/"><img src="http://themepure.net/template/outstock-prv/outstock/assets/img/logo/logo.png" alt="#" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className="nav-home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/shop" className="nav-link">Shop</Nav.Link>
                            {
                                iconShow&&
                                <>
                                    <Form className="d-flex nav-form">
                                        <div className="nav-form-search">
                                            <input type="text" />
                                            {/* <SearchIcon /> */}
                                            <p>Search</p>
                                        </div>
                                    </Form>
                                    <Nav className="nav-link"><Link to={logedin?"/cart":"login"} style={linkStyle}>Cart</Link></Nav>
                                    <NavDropdown title={<PersonIcon /> } className="navbar-collapse-icon" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to={logedin?"/myaccount":"login"}>My Account</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={logedin?"/orders":"login"}>Orders</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={logedin?"/whislist":"login"}>Whishlist</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>Contact</NavDropdown.Item>
                                    </NavDropdown>
                                    <Navbar.Text className="navbar-text">{
                                        logedin?userName:"Guest"
                                        }</Navbar.Text>
                                    <Nav className="nav-link"><Link to={logedin?"/logout":"login"} style={linkStyle}>{logedin?"Logout":"Login"}</Link></Nav>
                                </>
                            }
                            
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </nav>
        )
    }

    
}

export default NavigationBar
