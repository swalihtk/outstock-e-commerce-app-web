const SET_ADDRESS="set addresss";

const intiState={
    address:{}
}

const tempReducer=function(state=intiState, action){
    switch(action.type){
        case SET_ADDRESS:
            return {
                address:action.payload
            }
        default:
            return state;
    }
}

// settemp address
function setTempAddress(address){
    return dispatch=>{
        dispatch({type:SET_ADDRESS, payload:address});
    }
}

export {tempReducer,setTempAddress};