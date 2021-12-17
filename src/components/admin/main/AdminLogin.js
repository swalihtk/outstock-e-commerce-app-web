import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import "./style.css";


function AdminLogin() {

    // login form hanlder
    let [password, setPassword]=useState("");
    let [email, setEmail]=useState("");

    // error
    let [error, setError]=useState(false);
    let [errorMessage, setErrorMessage]=useState("");

    // router navigater
    let navigater=useNavigate();

    // form handling function
    function loginAdmin(e){
        e.preventDefault();
        axios.post("/admin/auth/signin", {
            email,password
        }).then(response=>{
            let data=response.data;
            if(data.errorMessage){
                setError(true);
                setErrorMessage(data.errorMessage);
            }else{
                window.location.reload("/admin");
            }
        }).catch(e=>{
            setError(true);
            setErrorMessage("Something went wrong");
        })
    }

    return (
        <div className="admin-login">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3">
                    </div>
                    <div className="col-12 col-md-5 mt-4">
                        <div className="admin-login-container">
                            <h1 className="text-center">Admin Login </h1>
                        <Form onSubmit={loginAdmin}>
                            <Form.Group className="mt-4" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="login-input" type="email" placeholder="Enter email"
                                value={email} onChange={e=>setEmail(e.target.value)} required
                                />
                            </Form.Group>

                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" className="login-input" placeholder="Password"
                                value={password} onChange={e=>setPassword(e.target.value)} required
                                />
                            </Form.Group>
                            <Button variant="primary" className="login-button" type="submit">
                                Login
                            </Button>

                            {
                                error&&<p className="text-danger mt-2 text-center">{errorMessage}</p>
                            }
                        </Form>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
