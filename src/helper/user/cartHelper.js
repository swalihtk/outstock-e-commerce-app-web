import axios from "axios";
import { getCartItems } from "../../redux/user/cartReducer";
import {listAllAddress} from "../../redux/user/addressReducer";

const helpers = {
  cartCountManger: (userId, productId, action) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/user/cart/countmanage", {
          userId,
          productId,
          action,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
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
