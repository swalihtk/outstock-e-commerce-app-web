import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdminDashboard from '../../../layouts/admin/AdminDashboard'
import SalesFilter from './SalesFilter'
import "./salesReport.css";
import SalesTable from './SalesTable';
import salesAction from "../../../actions/admin/saleReportAction";
import {Pagination} from "antd";
import {Placeholder} from "react-bootstrap";

function Index() {

    // state
    let [allOrders, setAllOrders]=useState([]);
    let [totalPage, setTotalPage]=useState(1);
    let [loading,setLoading]=useState(false);

    // router hooks
    let [searchParams, setSearchParams]=useSearchParams();
    let page=searchParams.get("page");
    let year=searchParams.get("year");
    let month=searchParams.get("month");
    let startDay=searchParams.get("startDay");
    let endDay=searchParams.get("endDay");

    // hooks
    let navigate=useNavigate();

    // mount
    useEffect(()=>{
        salesAction.getOrders(page, year, month, startDay, endDay, setAllOrders, setTotalPage, setLoading);
    }, [searchParams]); 

    // actions
    function handlePageChange(e){
        navigate(`/admin/sales_report?page=${e}&year=${year}&month=${month}&startDay=${startDay}&endDay=${endDay}`)
    }

    if(loading){
        return (
            <div>
                <AdminDashboard>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                </AdminDashboard>
            </div>
        )
    }else{
    return (
        <div>
            <AdminDashboard>
                <h3 className="text-center">Sales Report</h3>
                <SalesFilter startDay={startDay} endDay={endDay} year={year} month={month}/>
                {
                    allOrders.length<=0?
                    <h3 className="text-center mt-4 text-primary">No Orders found</h3>
                    :
                    <>
                    <SalesTable allOrders={allOrders}/>
                    <Pagination
                        style={{ marginTop: "1rem" }}
                        defaultCurrent={page}
                        total={Math.ceil(totalPage/10)*10}
                        onChange={handlePageChange}
                    />
                    </>
                }
            </AdminDashboard>
        </div>
    )
    }
}

export default Index
