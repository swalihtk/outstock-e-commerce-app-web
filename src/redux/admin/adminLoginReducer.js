import axios from "axios";

const ADMIN_LOGIN_FETCH="ADMIN_LOGIN_FETCH";
const ADMIN_LOGIN_SUCCESS="ADMIN_LOGIN_SUCCESS";
const ADMIN_LOGIN_ERROR="ADMIN_LOGIN_ERROR";


// state
const initialState={
    loading:true,
    logedin:undefined,
    error:""
}


// action
function fetchLogin(){
    return {
        type:ADMIN_LOGIN_FETCH
    }
}


function fetchLoginSuccess(data){
    return {
        type:ADMIN_LOGIN_SUCCESS,
        payload:data
    }
}

function fetchLoginError(data){
    return {
        type:ADMIN_LOGIN_ERROR,
        payload:data
    }
}

// reducer
const adminLoginFetchReducer=(state=initialState, action)=>{
    switch(action.type){
        case ADMIN_LOGIN_FETCH:
            return {
                ...state,
                loading:true,
                logedin:undefined
            }
        
        case ADMIN_LOGIN_SUCCESS:
            return {
                loading:false,
                logedin:action.payload.login,
                adminId:action.payload.userId,
                error:""
            }
        
        case ADMIN_LOGIN_ERROR:
            return {
                loading:false,
                logedin:undefined,
                error:action.payload
            }

        default:
            return state;
    }
}


// login fetch function
function isAdminLogedIn(){
    return (dispatch=>{
        dispatch(fetchLogin());
        axios.get("http://localhost:8000/admin/auth/check").then(response=>{
            dispatch(fetchLoginSuccess(response.data));
        }).catch(err=>{
            dispatch(fetchLoginError(err.message));
        })
    })
}


export {adminLoginFetchReducer, isAdminLogedIn};