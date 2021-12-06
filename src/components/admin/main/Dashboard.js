import React, { useEffect, useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import dashboardHelper from "../../../actions/admin/dashbordAction";


function Dashboard() {
  // states
  let [userLengthArray, setUserLengthArray] = useState([]);
  let [userLoading, setUserLoading] = useState(false);

  let [weekPrices, setWeekPrices]=useState([]);
  let [salesDate, setSalesWeekDate]=useState([]);

  let [totalOrder,setTotalOrder]=useState(0);
  let [totalSales,setTotalSales]=useState(0);
  let [totalRevenue,setTotalRevenue]=useState(0);
  let [totalReturns,setTotalReturns]=useState(0);
  let [dashDataLoading,setDashDataLoading]=useState(false);

  // ref
  let userChartRef = useRef();
  let salesReportRef=useRef();

  // mount
  useEffect(() => {
    dashboardHelper.getUserDetails(setUserLengthArray, setUserLoading);
    dashboardHelper.getWeekTotalSales(setWeekPrices, setSalesWeekDate);
    dashboardHelper.getDashBoardData(setTotalOrder, setTotalSales, setTotalRevenue, setTotalReturns, setDashDataLoading);
  }, []);

  // mount for userchart
  useEffect(() => {
    if(userLengthArray.length<=0)return;
    let userCanvas=userChartRef.current.getContext("2d");
    let chart=new window.Chart(
      userCanvas,
      {
        type:"pie",
        data:{
          labels:["active", "blocked"],
          datasets:[
            {
              label:["Active Users", "Blocked Users"],
              data:userLengthArray,
              backgroundColor:["blue", "red"]
            }
          ]
        },
        options:{
          plugins:{
            title:{
              display:true,
              text:"Users"
            }
          }
        }
      }
    )
    return ()=>chart.destroy();
  }, [userLengthArray]);

  // sales report chart mount
  useEffect(()=>{
    let salesReprtCtx=salesReportRef.current.getContext("2d");
    
    if(salesDate.length<=0 && weekPrices.length<=0) return;
    let chart=new window.Chart(
      salesReprtCtx,
      {
        type:"bar",
        data:{
          labels:salesDate,
          datasets:[
            {
              label:"Total Price",
              data:weekPrices,
              backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
            }
          ]
        },
        plugins:{
          title:{
            display:true,
            text:"Sales report"
          }
        }
      },
    )

    return ()=> chart.destroy();
  }, [salesDate, weekPrices])

  // actions

  // test
  // console.log(totalOrder);

  return (
    <>
      <div className="overview-boxes">
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Order</div>
            <div className="number">
              {
                dashDataLoading?
                <Spinner animation="grow" variant="warning"/>
                :
                totalOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            </div>
           
          </div>
          <i className="bx bx-cart-alt cart"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Sales</div>
            <div className="number">{
            dashDataLoading?
            <Spinner animation="grow" variant="warning"/>
            :
            totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </div>
          <i className="bx bxs-cart-add cart two"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Profit</div>
            <div className="number">₹{
            dashDataLoading?
            <Spinner animation="grow" variant="warning"/>
            :
            totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </div>
          <i className="bx bx-cart cart three"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Return</div>
            <div className="number">{
            dashDataLoading?
            <Spinner animation="grow" variant="warning"/>
            :
            totalReturns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </div>
          <i className="bx bxs-cart-download cart four"></i>
        </div>
      </div>

      <div className="sales-boxes">
        <div className="recent-sales box">
        <canvas ref={salesReportRef} width="400" height="400"></canvas>
        </div>
        <div className="top-sales box">
        <canvas ref={userChartRef} width="400" height="400"></canvas>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
