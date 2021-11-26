import axios from 'axios';
import swal from 'sweetalert';

const helpers={
    getAllBanners:async function(pageNu, sort, setTotalItems, setTotalBanners, setLoading){
        try{
            setLoading(true);
            let response=await axios.get("/admin/banner/listAll", {
                params:{
                    page:pageNu,
                    sort:sort
                }
            })
            if(response.status===200){
                setLoading(false);
                let data=response.data;
                setTotalItems(data.totalLength);
                setTotalBanners(data.allBanners);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    },

    createNewBanner:async function(formData,setLoading, setShowCreateModel){
        try{
            setLoading(true);
            let response=await axios.post("/admin/banner/create", formData);
            if(response.status===201){
                setLoading(false);
                swal("Created", "ok", "success");
                setShowCreateModel(false);

            }else{
                swal("Something went wrong", "ok", "error");
                setLoading(false);
            }
        }catch(e){
            setLoading(false);
            swal("Something went wrong", "ok", "error");
            return;
        }
    },

    deleteBanner:async function(bannerId, setLoading, getAllBanners){
        try{
            setLoading(true);
            let response=await axios.delete(`/admin/banner/delete/${bannerId}`);
            if(response.status===201){
                setLoading(false);
                swal("Deleted", "ok", "success");
                getAllBanners();
            }
        }catch(e){
            setLoading(false);
            swal("Something went wrong", "ok", "error");
        }
    }
}

export default helpers;