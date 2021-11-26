import axios from 'axios';
import swal from 'sweetalert';

const helpers={
    listAllOrders:async function(pageNu, setOrders, setLength, setLoading){
        try{
            setLoading(true);
            let response=await axios.get(`/user/order/listAll?page=${pageNu}`);
            let data=response.data;
            if(response.status===200){
                setOrders(data.allOrders);
                setLength(data.total);
                setLoading(false);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    },

    changeStatus:async function(userId, orderId, status){

        if(!userId || !orderId || !status) return;

        try{
            let response=await axios.post("/user/order/changeStatus/", {userId, orderId, status});

            if(response.status===201){
                swal("Status changed!", "Ok!", "success");
            }else{
                swal("Something went wrong!", "Ok!", "error");
            }
        }catch(e){
            return;
        }
    }
}

export default helpers;