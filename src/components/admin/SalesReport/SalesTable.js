import React from 'react'
import {Table} from "react-bootstrap";

function SalesTable(props) {

    // props
    let {allOrders}=props;

    return (
        <div className="container mt-4" style={{height:"60vh"}}>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>OrderId</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Subtotal</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    allOrders.map((item, index)=>{
                        let orderDetails=item.orderDetails;
                        let length=orderDetails.status.length-1;
                        return (
                            <tr key={index}>
                                <td style={{fontSize:"smaller"}}>{orderDetails._id}</td>
                                <td>{orderDetails.status[length].state}</td>
                                <td>{orderDetails.paymentMethod}</td>
                                <td>{orderDetails.address.FullName}</td>
                                <td>{orderDetails.address.Mobile}</td>
                                <td>{orderDetails.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{orderDetails.date.toString()}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </Table>
        </div>
    )
}

export default SalesTable
