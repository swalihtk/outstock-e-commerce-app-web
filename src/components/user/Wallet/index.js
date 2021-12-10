import React from 'react'
import WalletMain from './WalletMain'
import "./style.css";
import { useSelector } from 'react-redux';
import Login from '../Login';
import ContentSpinner from '../../../layouts/user/ContentSpinner';

function Index() {

    let { loading, logedin } = useSelector((state) => state.userLogin);


    // @desc    logedin checking
    if(loading) return <ContentSpinner variant="success" />
    if(!logedin) return <Login />
    return (
        <>
        <WalletMain />
        </>
    )
}

export default Index
