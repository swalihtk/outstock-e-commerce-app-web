import axios from 'axios';
import Swal from 'sweetalert2';

const helpers={
    applyCoupon:async function(setLoading, setErr, body,setTotalPrice){
        try{
            setLoading(true);
            let response=await axios.post("/admin/coupons/apply", body);
            setLoading(false);
            let data=response.data;
            if(response.status===200 && !data.error){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Coupon applyed!!'
                  })  
                  setErr("");
                setTotalPrice(data.newPrice);
            }else{
                let data=response.data;
                setErr(data.error);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    }
}

export default helpers;