import axios from "axios";

const FETCH_CATEGORY_PRODUCT = "FETCH_CATEGORY_PRODUCT";
const FETCH_CATEGORY_PRODUCT_SUCCESS = "FETCH_CATEGORY_PRODUCT_SUCCESS";
const FETCH_CATEGORY_PRODUCT_ERROR = "FETCH_CATEGORY_PRODUCT_ERROR";

let initState = {
  loading: false,
  products: [],
  error: "",
};

const fetchAllCatgoryProductReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CATEGORY_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };

    case FETCH_CATEGORY_PRODUCT_ERROR:
      return {
        loading: false,
        products: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

// fetching products according to category
function fetchProductsCateg(categoryName) {
  return (dispatch) => {
    dispatch({ type: FETCH_CATEGORY_PRODUCT });

    axios
      .get(`/home/products/listMain/${categoryName}`)
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORY_PRODUCT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CATEGORY_PRODUCT_ERROR, payload: err });
      });
  };
}

export { fetchAllCatgoryProductReducer, fetchProductsCateg };
