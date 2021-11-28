import axios from 'axios';
import swal from "sweetalert";
import { setTempAddress } from '../../redux/user/tempFile';

const helpers={
    placeOrder:async (userId,orderAddress, paymentMethod,cartItems,totalPrice, navigate, dispatch)=>{
        if(paymentMethod==="COD"){
            let body={
                userId,
                address:orderAddress,
                products:cartItems,
                paymentMethod:paymentMethod,
                totalPrice:totalPrice
            }
            try{
                let response=await axios.post("/user/order/add", body);
                if(response.status===201){
                    dispatch(setTempAddress(orderAddress))
                    navigate("/order/success");
                }else{
                    swal({
                        title: "Error!",
                        text: "Something went wrong!",
                        icon: "err",
                        button: "Ok!",
                      });
                }
            }catch(e){
                return;
            }

        }else{
            return;
        }
    }
}


export default helpers;