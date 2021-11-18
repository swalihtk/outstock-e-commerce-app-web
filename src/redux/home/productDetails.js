import axios from "axios";

const FETCH_PRODUCT_DETAILS = "FETCH_PRODUCT_DETAILS";
const FETCH_PRODUCT_DETAILS_SUCCESS = "FETCH_PRODUCT_DETAILS_SUCCESS";
const FETCH_PRODUCT_DETAILS_ERROR = "FETCH_PRODUCT_DETAILS_ERROR";

// state
const initState = {
  loading: false,
  product: {},
  error: "",
};

// reducer
const fetchProductDetailsHomeReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        error: "",
      };

    case FETCH_PRODUCT_DETAILS_ERROR:
      return {
        loading: false,
        product: "",
        error: action.payload,
      };

    default:
      return state;
  }
};

// action
function getProductDetails(prodId) {
  return (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_DETAILS });

    axios
      .get(`/home/products/details/${prodId}`)
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCT_DETAILS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_PRODUCT_DETAILS_ERROR, payload: err });
      });
  };
}

export { fetchProductDetailsHomeReducer, getProductDetails };
