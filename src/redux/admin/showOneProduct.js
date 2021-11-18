import axios from "axios";

const PRODUCT_ONE_FETCH = "PRODUCT_ONE_FETCH";
const PRODUCT_ONE_SUCCESS = "PRODUCT_ONE_SUCCESS";
const PRODUCT_ONE_ERROR = "PRODUCT_ONE_ERRROR";

const initialState = {
  loading: false,
  product: {},
  error: "",
};

// reducer
const oneProductShowAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ONE_FETCH:
      return {
        ...state,
        loading: true,
        product: {},
        error: "",
      };

    case PRODUCT_ONE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        error: "",
      };

    case PRODUCT_ONE_ERROR:
      return {
        loading: false,
        product: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

// dispatch function
function showOneProductAdmin(id) {
  return (dispatch) => {
    dispatch({ type: PRODUCT_ONE_FETCH });
    axios
      .get("/admin/product/listOne/" + id)
      .then((response) => {
        dispatch({ type: PRODUCT_ONE_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: PRODUCT_ONE_ERROR, payload: err });
      });
  };
}

export { showOneProductAdmin, oneProductShowAdminReducer };
