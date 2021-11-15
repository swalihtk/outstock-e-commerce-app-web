import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CategoryMain from './components/admin/category/CategoryMain';
import ListUsersMain from './components/admin/listUsers/ListUsersMain';
import AdminMain from './components/admin/main/AdminMain';
import Home from './components/common/Home';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Register from './components/user/Register';
import { isAdminLogedIn } from './redux/admin/adminLoginReducer';
import { isUserLogedIn } from './redux/user/logincheckReducer';

function Routers() {
    let {logedin}=useSelector(state=>state.userLogin);
    let adminLogedin=useSelector(state=>state.adminLogedin);
    let dispatch=useDispatch();

    useEffect(()=>{
        dispatch(isUserLogedIn());
        dispatch(isAdminLogedIn());
    }, [])

    
    return (
        <BrowserRouter>
            <Routes>
                    {/* User Routers */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={logedin?<Navigate to="/" />:<Login />} />
                    <Route path="/register" element={logedin?<Navigate to="/"/>:<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* Admin Routers */}
                    <Route path="/admin" element={<AdminMain />} />
                    {
                        adminLogedin.logedin&&
                        <>
                        <Route path="/admin/users" element={<ListUsersMain />} />
                        <Route path="/admin/category" element={<CategoryMain />} />
                        </>
                    }
                    
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
