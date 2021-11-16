import axios from "axios";

const PRODUCT_FETCH="PRODUCT_FETCH";
const PRODUCT_SUCCESS="PRODUCT_SUCCESS";
const PRODUCT_ERROR="PRODUCT_ERROR";

const initialState={
    loading:false,
    product:{},
    error:""
}

// action
function fetchProduct(){
    return {
        type:PRODUCT_FETCH
    }
}


function fetchProductSuccess(data){
    return {
        type:PRODUCT_SUCCESS,
        payload:data
    }
}

function fetchProductError(data){
    return {
        type:PRODUCT_ERROR,
        payload:data
    }
}

// reducer
const oneProductShowAdminReducer=(state=initialState, action)=>{
    switch(action.type){
        case PRODUCT_FETCH:
            return {
                ...state,
                loading:true,
                product:{},
                error:""
            }
        
        case PRODUCT_SUCCESS:
            return {
                loading:false,
                product:action.payload,
                error:""
            }
        
        case PRODUCT_ERROR:
            return {
                loading:false,
                product:{},
                error:action.payload
            }

        default:
            return state;
    }
}


// dispatch function
function showOneProductAdmin(id){
    return dispatch=>{
        dispatch(fetchProduct());
        axios.get("/admin/product/listOne/"+id).then(response=>{
            dispatch(fetchProductSuccess(response.data));
        }).catch(err=>{
            dispatch(fetchProductError(err))
        })
    }
}

export {showOneProductAdmin, oneProductShowAdminReducer};