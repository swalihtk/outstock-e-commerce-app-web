import React from 'react'
import AdminDashboard from '../../../layouts/admin/AdminDashboard'
import {Tabs, Tab} from "react-bootstrap";
import AllOffers from './AllOffers';
import "./offers.css"
import AllCoupons from './AllCoupons';

function Index() {
    return (
        <AdminDashboard>
            <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="1" title="Offers">
                    <AllOffers />
                </Tab>
                <Tab eventKey="2" title="Coupons">
                    <AllCoupons />
                </Tab>
            </Tabs>
        </AdminDashboard>
    )
}

export default Index
