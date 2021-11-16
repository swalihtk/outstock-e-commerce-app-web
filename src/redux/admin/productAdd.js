import axios from "axios";
import swal from "sweetalert";

const PRODUCT_ADD_FETCH="PRODUCT_ADD_FETCH";
const PRODUCT_ADD_SUCCESS="PRODUCT_ADD_SUCCESS";
const PRODUCT_ADD_ERROR="PRODUCT_ADD_ERROR";

const initialState={
    loading:false,
    success:false,
    error:""
}

// action
function fetchProductAdd(){
    return {
        type:PRODUCT_ADD_FETCH
    }
}


function fetchProductSuccess(){
    return {
        type:PRODUCT_ADD_SUCCESS
    }
}

function fetchProductError(data){
    return {
        type:PRODUCT_ADD_ERROR,
        payload:data
    }
}

// reducer
const productAddReducer=(state=initialState, action)=>{
    switch(action.type){
        case PRODUCT_ADD_FETCH:
            return {
                ...state,
                loading:true,
                success:undefined,
                error:""
            }
        
        case PRODUCT_ADD_SUCCESS:
            return {
                loading:false,
                success:true,
                error:""
            }
        
        case PRODUCT_ADD_ERROR:
            return {
                loading:false,
                success:false,
                error:action.payload
            }

        default:
            return state;
    }
}


// dispatch function
function addProductAdmin(filesForm, body){
    return (dispach)=>{
        dispach(fetchProductAdd());
        axios.post("/admin/product/getImageLink", filesForm).then(response=>{
            let data=response.data;
            body.productImages=data;
            axios.post("/admin/product/add", body).then(response=>{
                dispach(fetchProductSuccess());
                swal({
                    title: "Success",
                    text: "Product Uploaded!",
                    icon: "success",
                    button: "Ok!",
                  });
            
                window.location.reload();
            }).catch(err=>{
                dispach(fetchProductError(err));
                swal({
                    title: "Error",
                    text: err,
                    icon: "error",
                    button: "Ok!",
                });
            })
        }).catch(err=>{
            dispach(fetchProductError(err));
        })
    }
}

export {addProductAdmin, productAddReducer};