import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import NavigationBar from '../../layouts/user/NavigationBar'
import {useNavigate} from 'react-router-dom';
import ContentSpinner from '../../layouts/user/ContentSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpinner } from '../../redux/user/spinnerLoading';

function Register() {
    let {loading}=useSelector(state=>state.spinner);
    let dispatch=useDispatch();

    // form handler
    let [username, setUsername]=useState("");
    let [password, setPassword]=useState("");
    let [email, setEmail]=useState("");
    let [referalCode, setReferalCode]=useState("");

    // error
    let [error, setError]=useState(false);
    let [errorMessage, setErrorMessage]=useState("");

    // router navigator
    let navigoter=useNavigate();
    let [searchParams, setSearchParams]=useSearchParams();

    // form submit action
    function registerUser(e){
        e.preventDefault();
        let body=referalCode?{username, email, password, referal:referalCode}:{username, email, password};
        axios.post("/user/auth/signup", body).then(response=>{
            let data=response.data;
            if(data.error){
                setError(true);
                setErrorMessage(data.error);
            }else{
                setError(false);
                navigoter("/login")
            }
        }).catch(err=>{
            setError(true);
            setErrorMessage("something went wrong");
        })
    }


    useEffect(()=>{
        dispatch(loadSpinner());
        let referal=searchParams.get("refcode");
        if(!referal) return;
        setReferalCode(referal);
     }, [])
    

    return (
        <>
          <NavigationBar iconShow={false}/>
            {
                loading?
                <ContentSpinner variant="warning" />
                :
           <div className="register container">
            <div className="register-page">
                <Form onSubmit={registerUser}>
                    <Form.Group className="mt-4" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="register-input" type="text" value={username} placeholder="Enter username" onChange={e=>setUsername(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mt-4" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="register-input" type="email" value={email} placeholder="Enter email" onChange={e=>setEmail(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mt-4" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className="register-input" value={password} placeholder="Password" onChange={e=>setPassword(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-4" controlId="formBasicPassword">
                        <Form.Label>Referal Code (optionel)</Form.Label>
                        <Form.Control type="text" className="register-input" value={referalCode} placeholder="Referal" onChange={e=>setReferalCode(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" className="register-button" type="submit">
                        Register
                    </Button>
                    {
                        error&&<p className="text-danger mt-2 text-center">{errorMessage}</p>
                    }
                </Form>

                {/* Login or horizonental line */}
                <div className="register-or">
                <div /><p>Or</p><div/>
                </div>

                {/* Register now link */}
                <Link to="/login" style={{color:"black", textDecoration:"none"}}>
                    <Button variant="warning" className="register-button mt-3" type="submit" style={{border:"1px solid grey"}}>
                    Login  Now
                    </Button>
                </Link>
            </div>
          </div>  
          }
        </>
    )
}

export default Register
