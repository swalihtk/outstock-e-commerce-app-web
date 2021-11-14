import React, { useEffect } from 'react'
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./style.css";
import PersonIcon from '@material-ui/icons/Person';


function AdminNavigation() {

    

    return (
        <Navbar bg="light" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Brand href="/"><img src="http://themepure.net/template/outstock-prv/outstock/assets/img/logo/logo.png" alt="#" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
                            <Form className="d-flex nav-form">
                                        <div className="nav-form-search">
                                            <input type="text" />
                                            {/* <SearchIcon /> */}
                                            <p>Search</p>
                                        </div>
                            </Form>
                            <Navbar.Collapse className="justify-content-end">
                            <Nav.Link className="nav-link"><PersonIcon/></Nav.Link>
                            <Navbar.Text>Admin</Navbar.Text> 
                            </Navbar.Collapse>
                            
                            <Nav.Link className="nav-link">Logout</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
    )
}

export default AdminNavigation
