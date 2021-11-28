import axios from 'axios';

const helpers={
    getAllBanners:async function(setAllBanners, setLoading){
        try{
            setLoading(true);
            let response=await axios.get("/admin/banner/listAll", {
                params:{
                    page:1,
                    sort:-1
                }
            })

            if(response.status===200){
                setLoading(false);
                setAllBanners(response.data.allBanners);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    }
}

export default helpers;