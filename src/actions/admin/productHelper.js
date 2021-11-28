import axios from 'axios';

const helpers={
    getMainCategory:async function(setCategry){
        try{
            let result = await axios.get("/admin/category/get");

            if(result.status===200){
                setCategry(result.data);
            }

        }catch(e){
            return;
        }
    }
}

export default helpers;