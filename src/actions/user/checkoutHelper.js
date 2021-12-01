import axios from 'axios';
import swal from "sweetalert";
import { setTempAddress } from '../../redux/user/tempFile';

const helpers={

    handleRazerPay:async function(userId,totalPrice, address, navigate, cartItems){
        let srcResult=this.loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(totalPrice>5000000){
            swal("You can't buy item more than in 10 lack in razerapy!!", "ok", "error");
            return;
        }

        if(!srcResult) return;
        let apiResponse=await axios.post("/user/order/razorpay", {amount:Math.floor(totalPrice)});
        let {amount, id, currency}=apiResponse.data; 
        
        let options={
            "key": "rzp_test_mUwN2eWFR7nBCS", // Enter the Key ID generated from the Dashboard
            "amount": amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": currency,
            "name": "OUTSTOCK PRIVATE LIMITED",
            "description": "Test Transaction",
            "image": "http://themepure.net/template/outstock-prv/outstock/assets/img/logo/logo.png",
            "order_id":id, //This is a sample Order ID. Pass the `id` obtained in the previous step
            "handler": async function(response){
                let apiResult=await axios.post("/user/order/razorpay/success", {
                    userId:userId,
                    orderId:id, 
                    razorpayPaymentId:response.razorpay_payment_id,
                    razorpaySignature:response.razorpay_signature,
                    address:address,
                    totalPrice:amount,
                    products:cartItems
                })
                if(apiResult.status===200){
                    navigate("/orders/success/"+userId);
                }else{
                    alert("Validation failed");
                }
            },
            "prefill": {
                "name": address.FullName,
                "contact": address.Mobile,
                "email":address.FullName.toLowerCase()+"@gmail.com"
            },
            "notes": {
                "address": "Outstock private limited"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        let razorPayObject=new window.Razorpay(options);
        razorPayObject.open();
    },

    placeOrder:async function(userId,orderAddress, paymentMethod,cartItems,totalPrice, navigate, dispatch, handlePaypal){
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
                    navigate("/orders/success/"+userId);
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

        }else if("RAZORPAY"){
           this.handleRazerPay(userId,totalPrice, orderAddress, navigate, cartItems);
        }else{
            handlePaypal();
        }
    },


    loadScript:function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    },

}


export default helpers;