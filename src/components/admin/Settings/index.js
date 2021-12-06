import React from 'react'
import AdminDashBoard from "../../../layouts/admin/AdminDashboard";
import AdminAccount from "./AdminAccount";
import "./setting.css";

function Index() {
    return (
        <>
            <AdminDashBoard>
            <AdminAccount />
            </AdminDashBoard>
        </>
    )
}

export default Index
