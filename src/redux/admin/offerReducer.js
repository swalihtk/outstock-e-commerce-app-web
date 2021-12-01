import axios from "axios";

// constants
const FETCH_OFFERS="FETCH_OFFERS";
const FETCH_OFFERS_SUCCESS="FETCH_OFFERS_SUCCESS";
const FETCH_OFFERS_FAILURE="FETCH_OFFERS_FAILURE";

// state
const initState={
    loading:false,
    offers:[],
    total:[],
    error:""
}

// reducer
const adminOfferReducer=function(state=initState, action){
    switch(action.type){
        case FETCH_OFFERS:
            return {
                ...state,
                loading:true
            }
        case FETCH_OFFERS_SUCCESS:
            return {
                loading:false,
                offers:action.payload.offers,
                total:action.payload.total,
                error:""
            }
        case FETCH_OFFERS_FAILURE:
            return {
                error:action.payload,
                total:[],
                loading:false
            }
        default:
            return state;
    }
}

// actions
function getAllOffers(){
    return async(dispatch)=>{
        try{
            dispatch({type:FETCH_OFFERS});
            let response=await axios.get("/admin/offers/listAll");
            if(response.status===200){
                dispatch({type:FETCH_OFFERS_SUCCESS, payload:response.data})
            }else{
                dispatch({type:FETCH_OFFERS_FAILURE, payload:response.data.error})
            }
        }catch(e){
            dispatch({type:FETCH_OFFERS_FAILURE, payload:e.message});
        }
    }
}

export {adminOfferReducer, getAllOffers};