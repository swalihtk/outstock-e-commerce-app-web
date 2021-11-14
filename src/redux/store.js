import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { adminLoginFetchReducer } from "./admin/adminLoginReducer";
import { userLoginFetchReducer } from "./user/logincheckReducer";
import { spinnerReducer } from "./user/spinnerLoading";


const rootReducer=combineReducers({
    userLogin:userLoginFetchReducer,
    spinner:spinnerReducer,
    adminLogedin:adminLoginFetchReducer
})


const store=createStore(rootReducer, applyMiddleware(thunk));


export default store;