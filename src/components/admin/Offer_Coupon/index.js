import React from 'react'
import AdminDashboard from '../../../layouts/admin/AdminDashboard'
import {Tabs, Tab} from "react-bootstrap";
import AllOffers from './AllOffers';
import "./offers.css"

function Index() {
    return (
        <AdminDashboard>
            <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="1" title="Offers">
                    <AllOffers />
                </Tab>
                <Tab eventKey="2" title="Coupons">
                    <h1>All Coupons</h1>
                </Tab>
            </Tabs>
        </AdminDashboard>
    )
}

export default Index
