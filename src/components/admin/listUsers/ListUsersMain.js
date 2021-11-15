import React from 'react'
import AdminDashboard from '../../../layouts/admin/AdminDashboard'
import "../style.css";
import ListUsers from './ListUsers';

function ListUsersMain() {
    return (
        <>
          <AdminDashboard container={<ListUsers />}/>  
        </>
    )
}

export default ListUsersMain
