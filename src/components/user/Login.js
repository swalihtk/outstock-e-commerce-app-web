import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import NavigationBar from '../../layouts/user/NavigationBar'
import "./style.css";
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ContentSpinner from '../../layouts/user/ContentSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpinner } from '../../redux/user/spinnerLoading';

function Login() {

    let {loading}=useSelector(state=>state.spinner);
    let dispatch=useDispatch();

    // login form hanlder
    let [password, setPassword]=useState("");
    let [email, setEmail]=useState("");

    // error
    let [error, setError]=useState(false);
    let [errorMessage, setErrorMessage]=useState("");

    // router navigater
    let navigater=useNavigate();

    // form handling function
    function loginUser(e){
        e.preventDefault();
        axios.post("/user/auth/signin", {
            email,password
        }).then(response=>{
            let data=response.data;
            if(data.errorMessage){
                setError(true);
                setErrorMessage(data.errorMessage);
            }else{
                navigater("/");
            }
        }).catch(e=>{
            setError(true);
            setErrorMessage("Something went wrong");
        })
    }


    useEffect(()=>{
        dispatch(loadSpinner());
    }, [])


    return (
        <>
          <NavigationBar iconShow={false}/>  
          {
              loading?
              <ContentSpinner variant="primary" />
              :
              <div className="login container">
            <div className="login-page">
                <Form onSubmit={loginUser}>
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

                    {/* <Button variant="primary" className="login-button mt-3" style={{border:"1px solid green"}} type="submit">
                        Login with OTP <PhoneIcon style={{marginLeft:"0.5rem"}} />
                    </Button> */}
                </Form>

                {/* Login or horizonental line */}
                <div className="login-or">
                <div /><p>Or</p><div/>
                </div>

                {/* Register now link */}
                <Link to="/register" style={{color:"black", textDecoration:"none"}}>
                    <Button variant="warning" className="register-button mt-3" type="submit" style={{border:"1px solid grey"}}>
                    Register Now
                    </Button>
                </Link>
            </div>
          </div>
          }
        </>
    )
}

export default Login
