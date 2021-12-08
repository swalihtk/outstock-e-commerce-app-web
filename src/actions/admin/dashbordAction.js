import axios from 'axios';

const helpers={
    getUserDetails:async function(setUserArray, setLoading){
        try{
            setLoading(true);
            let activeUsers=await axios.get("/admin/users/active");
            let blockedUsers=await axios.get("/admin/users/blocked");
            setLoading(false);
            if(activeUsers.status===200 && blockedUsers.status===200){
                setUserArray([activeUsers.data.length, blockedUsers.data.length]);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    },

    getWeekTotalSales:async function(setSalesPrice,setSalesDate){
        try{
            let result=await axios.get("/admin/sales_report/total_sales_week");

            if(result.status===200){
                let data=result.data;
                setSalesDate(data.dates);
                setSalesPrice(data.prices);
            }else{
                setSalesPrice([]);
                setSalesDate([]);
                return;
            }
        }catch(e){
            return;
        }
    },

    getDashBoardData:async function(setTotalOrders, setTotalSales, setTotalRevenue, setTotalReturns, setDashDataLoading){
        try{
            setDashDataLoading(true);
            let response=await axios.get("/admin/sales_report/dashboard");
            setDashDataLoading(false);
            if(response.status===200 && response.data.allOrders){
                let data=response.data;
                if(data.allOrders){
                    setTotalOrders(data.allOrders);
                }
                if(data.totalSales){
                    setTotalSales(data.totalSales);
                }
                if(data.totalReturns){
                    setTotalReturns(data.totalReturns);
                }
                if(data.totalRevenue){
                    setTotalRevenue(data.totalRevenue);
                }
            }else{
                setTotalOrders(0);
                setTotalSales(0);
                setTotalReturns(0);
                setTotalRevenue(0);
                return;
            }
        }catch(e){
            setDashDataLoading(false);
            return;
        }
    }
}

export default helpers;