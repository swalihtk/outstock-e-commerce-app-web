import axios from "axios";

const FETCH_LOGIN = "FETCH_LOGIN";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

// state
const initialState = {
  loading: true,
  logedin: undefined,
  userId: "",
  error: "",
  userInfo:{}
};

// action
function fetchLogin() {
  return {
    type: FETCH_LOGIN,
  };
}

function fetchLoginSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
}

function fetchLoginError(data) {
  return {
    type: FETCH_ERROR,
    payload: data,
  };
}

// reducer
const userLoginFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN:
      return {
        ...state,
        loading: true,
        logedin: undefined,
      };

    case FETCH_SUCCESS:
      return {
        loading: false,
        logedin: action.payload.login,
        userId: action.payload.userId,
        userInfo:action.payload.response
      };

    case FETCH_ERROR:
      return {
        loading: false,
        logedin: undefined,
        error: action.payload,
        userInfo:{}
      };

    default:
      return state;
  }
};

// login fetch function
function isUserLogedIn() {
  return (dispatch) => {
    //dispatch(fetchLogin());
    axios
      .get("/user/auth/check")
      .then((response) => {
        if(response.status===200 && response.data.login){
          dispatch(fetchLoginSuccess(response.data));
        }else{
          dispatch(fetchLoginError("error"));
        }
      })
      .catch((err) => {
        dispatch(fetchLoginError(err.message));
      });
  };
}

export { isUserLogedIn, userLoginFetchReducer };
