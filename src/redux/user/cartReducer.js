import axios from "axios";

const FETCH_CART = "fetch cart";
const FETCH_CART_SUCCESS = "fetch cart success";
const FETCH_CART_FAILURE = "fetch cart error";
const QUANTITY_INCREASE = "increase qunaity";

const initState = {
  loading: false,
  count: 0,
  products: [],
  quantity: 0,
  error: "",
};

// recuer
const cartReducer = function (state = initState, action) {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CART_SUCCESS:
      return {
        loading: false,
        count: action.payload.count,
        products: action.payload.prdouctDetails,
        error: "",
      };

    case FETCH_CART_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case QUANTITY_INCREASE:
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return state;
  }
};

// actions
function getCartItems(userId) {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_CART });
      let response = await axios.get("/user/cart/all/" + userId);
      dispatch({ type: FETCH_CART_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: FETCH_CART_FAILURE, payload: err });
    }
  };
}

function addToCart(userId, productId) {
  return (dispatch) => {
    axios
      .post("/user/cart/add", { userId, productId })
      .then((response) => {
        dispatch({ type: QUANTITY_INCREASE });
      })
      .catch((err) => {
        alert("something went wrong!!");
      });
  };
}

// quantity manager
function cartCountMange(userId, productId, action) {
  return (dispatch) => {
    dispatch({ type: FETCH_CART });
    axios
      .post("/user/cart/countmanage", {
        userId,
        productId,
        action,
      })
      .then((response) => {
        dispatch({ type: FETCH_CART_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CART_FAILURE, payload: err });
      });
  };
}

// export
export { cartReducer, getCartItems, addToCart, cartCountMange };
