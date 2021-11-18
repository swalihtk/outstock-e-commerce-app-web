import axios from "axios";

const FETCH_CATEGORY = "FETCH_CATEGORY";
const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
const FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR";

// state
const initState = {
  loading: true,
  categorys: [],
  error: "",
};

// reducer
const listCategoryHomeReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        ...state,
        loading: true,
        categorys: [],
        error: "",
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        loading: false,
        categorys: action.payload,
        error: "",
      };
    case FETCH_CATEGORY_ERROR:
      return {
        loading: false,
        categorys: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// category fetch action
function getAllCategoryHome() {
  return (dispatch) => {
    dispatch({ type: FETCH_CATEGORY });

    axios
      .get("/home/category/list")
      .then((response) => {
        dispatch({ type: FETCH_CATEGORY_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CATEGORY_ERROR, payload: err });
      });
  };
}

export { getAllCategoryHome, listCategoryHomeReducer };
