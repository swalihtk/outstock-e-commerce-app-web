import axios from "axios";

const PRODUCT_FETCH = "PRODUCT_FETCH";
const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
const PRODUCT_ERROR = "PRODUCT_ERROR";

const initialState = {
  loading: false,
  productsArray: [],
  count: 0,
  error: "",
};

// action
function fetchProduct() {
  return {
    type: PRODUCT_FETCH,
  };
}

function fetchProductSuccess(data) {
  return {
    type: PRODUCT_SUCCESS,
    payload: data,
  };
}

function fetchProductError(data) {
  return {
    type: PRODUCT_ERROR,
    payload: data,
  };
}

// reducer
const productShowReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FETCH:
      return {
        ...state,
        loading: true,
        productsArray: [],
        totalItem: 0,
        error: "",
      };

    case PRODUCT_SUCCESS:
      return {
        loading: false,
        productsArray: action.payload.products,
        totalItem: action.payload.count,
        error: "",
      };

    case PRODUCT_ERROR:
      return {
        loading: false,
        productsArray: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

// dispatch function
function showAllProductAdmin(pageNum, categoryName, searchName, sort) {
  return (dispatch) => {
    
    dispatch(fetchProduct());
    axios
      .get("/admin/product/listAll", {
        params:{
          page:pageNum,
          mainCategory:categoryName,
          name:searchName,
          sort:sort
        }
      })
      .then((response) => {
        dispatch(fetchProductSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchProductError(err));
      });
  };
}



export { showAllProductAdmin, productShowReducer };
