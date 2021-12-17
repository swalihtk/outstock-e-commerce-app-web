import axios from "axios";
import { getCartItems } from "../../redux/user/cartReducer";
import {listAllAddress} from "../../redux/user/addressReducer";
import swal from "sweetalert";

const helpers = {
  cartCountManger: async (userId, productId, quantity, setLoading) => {
    try{
      setLoading(true);
      let response=await axios.post("/user/cart/countmanage", {userId,productId,quantity:parseInt(quantity)});
      setLoading(false);
      if(response.status===201){
        return;
      }else{
        swal("something went wrong!!", "ok", "error");
      }
    }catch(e){
      setLoading(false);
      swal("something went wrong!!", "ok", "error");
    }
  },

  removeFromCart: async (userId, productId, dispatch) => {
    try {
      await axios.post("/user/cart/delete", { userId, productId });
      dispatch(getCartItems(userId));
    } catch (e) {
      return;
    }
  },

  gotoCheckoutPage:(navigate, dispatch, userId)=>{
    dispatch(listAllAddress(userId));
    navigate(`/cart/checkout/${userId}`);
  }
};

export default helpers;
