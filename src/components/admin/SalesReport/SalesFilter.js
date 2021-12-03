import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function SalesFilter({month, year, startDay, endDay}) {

    // let arrays
    let allMonths=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // states
    let [yearList,setYearList]=useState([]);
    let [dayStart, setDayStart]=useState(startDay);
    let [dayEnd, setDayEnd]=useState(endDay);

    // hooks
    let navigate=useNavigate();

    // mount
    useEffect(()=>{
        let currentYear=new Date().getFullYear();
        for(let i=0;i<=5;i++){
            setYearList((prev)=>[...prev, currentYear-i])
        }
    },[])

    // actions
    function handleMonthChange(e){
        navigate(`/admin/sales_report?page=1&year=${year}&month=${e.target.value}&startDay=${startDay}&endDay=${endDay}`)
    }

    function handleYearChange(e){
        navigate(`/admin/sales_report?page=1&year=${e.target.value}&month=${month}&startDay=${startDay}&endDay=${endDay}`)
    }

    function handleDateChange(){
        if(dayStart<1||dayStart>31){
            return;
        }
        if(dayEnd<1 || dayEnd>31){
            return;
        }

        navigate(`/admin/sales_report?page=1&year=${year}&month=${month}&startDay=${dayStart}&endDay=${dayEnd}`)
    }

    return (
        <div className="salesFilter__main">
            <div className="salesFilter__year">
                <select onChange={handleYearChange} value={parseInt(year)}>
                    {
                        yearList.map((item,key)=>{
                            return <option key={key}>{item}</option>
                        })
                    }
                </select>
            </div>
            <div className="salesFilter__month">
                <select onChange={handleMonthChange} value={parseInt(month)}>
                    {
                        allMonths.map((item,index)=>{
                                return <option key={index} value={index+1}>{item}</option>
                        })
                    }
                </select>
            </div>
            <div className="salesFilter__date">
                <label>From</label>
                <input type="number" min={1} max={31} value={dayStart} onChange={(e)=>setDayStart(e.target.value)}/>
                <label>To</label>
                <input type="number" min={1} max={31} value={dayEnd} onChange={(e)=>setDayEnd(e.target.value)}/>
                <button onClick={handleDateChange}><ArrowForwardIosIcon /></button>
            </div>
        </div>
    )
}

export default SalesFilter
