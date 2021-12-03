import axios from 'axios';

const helpers={
    getOrders:async function(page, year, month, startDay, endDay, setAllOrders, setTotalPage, setLoading){
        try{
            setLoading(true);
            let result=await axios.get("/admin/sales_report", {
                params:{
                    page:page,
                    year:year,
                    month:month,
                    startDay:startDay,
                    endDay:endDay
                }
            })
            
            setLoading(false);
            if(result.status===200){
                let data=result.data
                if(!data.result){
                    setAllOrders([]);
                    setTotalPage(0);
                    return;
                }
                setAllOrders(data.result);
                setTotalPage(data.total);
            }else{
                return;
            }
        }catch(e){
            setLoading(false);
            return;
        }
    }
}

export default helpers;