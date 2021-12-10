import axios from 'axios';
import { getCartItems } from '../../redux/user/cartReducer';
import swal from 'sweetalert';

const helpers={
    listWhishlistItems:async function(setLoading, setItems, setErr, userId){
        try{
            setLoading(true);
            let response=await axios.get(`/user/whishlist/${userId}`);
            setLoading(false);
           
            let data=response.data;
            if(data){
                setItems(data);
            }else{
                setItems([]);
            }
        }catch(e){
            setLoading(false);
            setErr("Something went wrong!!");
        }
    },

    addToWhishlist:async function(setLoading, setErr,userId, productId, dispatch){
        try{
            setLoading(true);
            let response=await axios.post("/user/whishlist", {userId,productId});
            let data=response.data;
            setLoading(false);
            if(!data) return;
            if(!data.error){
                swal("Item added to whishlist", "ok", "success");
                dispatch(getCartItems(userId));
            }else{
                setErr(data.error);
            }
        }catch(e){
            setErr("Something went wrong!!");
        }
    },

    deleteFromWhishlist:async function(setLoading,userId, productId, listItems){
        try{
            setLoading(true);

            let response=await axios.put("/user/whishlist", {userId:userId,productId:productId});
            setLoading(false);
            let data=response.data;
            if(!data) return;

            if(!data.error){
                swal("Product removed from whishlist", "ok","success");
                listItems();
            }else{
                swal("Something went wrong", "ok", "error");
            }
        }catch(e){
            swal("Something went wrong", "ok", "error");
            setLoading(false);
            return;
        }
    }
}

export default helpers;