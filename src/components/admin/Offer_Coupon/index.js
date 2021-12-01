import React from 'react'
import AdminDashboard from '../../../layouts/admin/AdminDashboard'
import {Tabs, Tab} from "react-bootstrap";
import AllOffers from './AllOffers';
import "./offers.css"

function Index() {
    return (
        <AdminDashboard>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Offers">
                    <AllOffers />
                </Tab>
                <Tab eventKey="profile" title="Coupons">
                    <h1>All Coupons</h1>
                </Tab>
            </Tabs>
        </AdminDashboard>
    )
}

export default Index
