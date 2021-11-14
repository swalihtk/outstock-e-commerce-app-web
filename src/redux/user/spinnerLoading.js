const SPINNER_LOADING="SPINNER_LOADING";
const SPINNER_DONE="SPINNER_DONE";

// state
const initialState={
    loading:true
}


// functions
function spinnerLoading(){
    return {
        type:SPINNER_LOADING
    }
}

function spinnerDone(){
    return {
        type:SPINNER_DONE
    }
}


// reducer
const spinnerReducer=(state=initialState, action)=>{
    switch(action.type){
        case SPINNER_LOADING:
            return {
                loading:true
            }
        case SPINNER_DONE:
            return{
                loading:false
            }
        default:
            return state;
    }
}


// dispatch function
function loadSpinner(){
    return (dispatch=>{
        dispatch(spinnerLoading())
        setTimeout(()=>{
            dispatch(spinnerDone());
        }, 1000);
    })
}



export {loadSpinner, spinnerReducer};