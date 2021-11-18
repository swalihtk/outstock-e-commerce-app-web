import axios from "axios";

const FETCH_SUB_CATEGORY_PRODUCT = "FETCH_SUB_CATEGORY_PRODUCT";
const FETCH_SUB_CATEGORY_PRODUCT_SUCCESS = "FETCH_SUB_CATEGORY_PRODUCT_SUCCESS";
const FETCH_SUB_CATEGORY_PRODUCT_ERROR = "FETCH_SUB_CATEGORY_PRODUCT_ERRROR";

const initState = {
  loading: true,
  products: [],
  error: "",
};

// reducer
const subCategoryListReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_SUB_CATEGORY_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SUB_CATEGORY_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };

    case FETCH_SUB_CATEGORY_PRODUCT_ERROR:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

// function
function listProductsInSubCat(mainCat, subCat) {
  return (dispatch) => {
    dispatch({ type: FETCH_SUB_CATEGORY_PRODUCT });

    axios
      .get("/home/products/listSub", {
        params: {
          categoryName: mainCat,
          subCatName: subCat,
        },
      })
      .then((response) => {
        dispatch({
          type: FETCH_SUB_CATEGORY_PRODUCT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_SUB_CATEGORY_PRODUCT_ERROR, payload: err });
      });
  };
}

export { subCategoryListReducer, listProductsInSubCat };
