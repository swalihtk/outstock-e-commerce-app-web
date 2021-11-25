import axios from 'axios';

// instance
const FETCH_ADDRESS="FETCH_ADDRESS";
const FETCH_ADDRESS_SUCCESS="FETCH_ADDRESS_SUCCESS";
const FETCH_ADDRESS_FAILURE="FETCH_ADDRESS_FAILURE";

// state
const initState={
    loading:false,
    addresss:[],
    error:""
}

// reducer
const addressReducer=(state=initState, action)=>{
    switch(action.type){
        case FETCH_ADDRESS:
            return {
                ...state,
                loading:true
            }
        case FETCH_ADDRESS_SUCCESS:
            return {
                loading:false,
                address:action.payload,
                err:""
            }
        case FETCH_ADDRESS_FAILURE:
            return {
                loading:false,
                address:[],
                err:action.payload
            }
        default:
            return state;
    }
}

// actions
function listAllAddress(userId){
    return dispatch=>{
        dispatch({type:FETCH_ADDRESS});
        axios.get("/user/account/address/list/"+userId)
        .then(response=>{
            dispatch({type:FETCH_ADDRESS_SUCCESS, payload:response.data});
        })
        .catch(err=>{
            dispatch({type:FETCH_ADDRESS_FAILURE, payload:err});
        })
    }
}

// exports
export {addressReducer, listAllAddress};