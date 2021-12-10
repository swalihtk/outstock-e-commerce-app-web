import React from 'react'
import NavigationBar from '../../../layouts/user/NavigationBar';
import Login from '../Login';
import ProfileNavigation from './ProfileNavigation';
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {useSearchParams} from 'react-router-dom';
import OtherFooter from '../../../layouts/user/OtherFooter';

function Index() {

    let { logedin } = useSelector((state) => state.userLogin);
    let [searchParams, setSearchParams]=useSearchParams();

    // queries
    let routerQuery=searchParams.get("link");

    if(!logedin) return <Login />

    return (
        <>
        <NavigationBar iconShow={true}/>
        <ProfileNavigation routerQuery={routerQuery}/>
        <br/>
        <OtherFooter />
        </>
    )
}

export default Index
