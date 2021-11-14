import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ContentSpinner from '../../layouts/user/ContentSpinner';
import { isAdminLogedIn } from '../../redux/admin/adminLoginReducer';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import "./style.css";


function AdminMain() {
    let {loading, logedin}=useSelector(state=>state.adminLogedin);
    let dispatch=useDispatch();


    // component did mount
    useEffect(()=>{
        dispatch(isAdminLogedIn());
    }, [])

    if(loading){
        return <ContentSpinner variant="warning"/>
    }else{
        if(logedin){
            return <AdminDashboard />
        }else{
            return <AdminLogin />
        }
    }
}

export default AdminMain
