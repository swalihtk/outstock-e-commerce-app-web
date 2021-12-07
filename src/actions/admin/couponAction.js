import axios from 'axios';
import swal from 'sweetalert'

const helpers={

    listAllCoupons:async function(setLoading, page, setCouponList){
        try{
            setLoading(true);
            let response=await axios.get("/admin/coupons/list", {params:{page}});
            setLoading(false);
            if(response.status===200){
                let data=response.data;
                setCouponList(data);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    },

    createNewCoupon:async function(setLoading,body, setErr, listAllCoupons, handleCreateFormClose){
        try{
            setLoading(true);
            let response=await axios.post("/admin/coupons/create", body);
            setLoading(false);
            if(response.status===201){
                swal("New Coupon Created", "ok", "success");
                listAllCoupons();
                handleCreateFormClose();
            }else{
                let data=response.data;
                setErr(data.error);
            }
        }catch(e){
            setLoading(false);
            swal(e.message, "ok", "error");
            return;
        }
    },
    
    editCoupon:async function(setLoading, body, setErr, listAllCoupons, setShowForm, setEditId){
        try{
            setLoading(true);
            let response=await axios.put("/admin/coupons/edit", body);
            setLoading(false);
            if(response.status===201){
                swal("Updated", "ok", "success");
                listAllCoupons();
                setShowForm(false);
                setEditId("");
            }else{
                let data=response.data;
                setErr(data.error)
            }
        }catch(e){
            setLoading(false);
            return;
        }
    },

    deleteCoupon:async function(setLoading, id, listAllCoupons){
        try{
            setLoading(true);
            let response=await axios.delete(`/admin/coupons/delete/${id}`);
            setLoading(false);
            if(response.status===200){
                swal("Deleted successfully!!", "ok", "success");
                listAllCoupons();
            }else{
                swal("something went wrong", "ok", "error");
            }
        }catch(e){
            swal("something went wrong", "ok", "error");
            setLoading(false);
            return;
        }
    },

    getOneCoupon:async function(setLoading, id, setCouponDetails, setShowFormFalse){
        try{
            let response=await axios.get(`/admin/coupons/list/${id}`);
            if(response.status===200){
                let data=response.data;
                setCouponDetails(data);
            }else{
                swal("Something went wrong!!", "ok", "error");
                setShowFormFalse();
                return;
            }
        }catch(e){
            swal("Something went wrong!!", "ok", "error");
            setShowFormFalse();
            return;
        }
    }
}

export default helpers;