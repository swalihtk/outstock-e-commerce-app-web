import React from 'react'
import NavigationBar from '../../../layouts/user/NavigationBar';
import Login from '../Login';
import ProfileNavigation from './ProfileNavigation';
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

function Index() {

    let { logedin } = useSelector((state) => state.userLogin);

    if(!logedin) return <Login />

    return (
        <>
        <NavigationBar iconShow={true}/>
        <ProfileNavigation />
        </>
    )
}

export default Index
