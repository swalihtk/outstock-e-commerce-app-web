import axios from 'axios';

const helpers={
    getUserOrders:async function(userId, setOrders){
        try{
            let result=await axios.get("/user/order/listUserOrders/"+userId);
            if(result.status===200){
                setOrders(result.data);
            }
        }catch(e){
            return;
        }
    },

    getUserOrderDetails:async function(userId,orderId, setProductDetails){
        try{
           let response=await axios.get(`/user/order/getProductDetails/${userId}/${orderId}`);
           if(response.status===200){
               setProductDetails(response.data);
           }
        }catch(e){
            return;
        }  
    }   
}

export default helpers;