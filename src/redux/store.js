import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { adminLoginFetchReducer } from "./admin/adminLoginReducer";
import { userLoginFetchReducer } from "./user/logincheckReducer";
import { spinnerReducer } from "./user/spinnerLoading";
import { productAddReducer } from "./admin/productAdd";
import { productShowReducer } from "./admin/showAllProduct";
import { oneProductShowAdminReducer } from "./admin/showOneProduct";
import { productUpdateReducer } from "./admin/productUpdate";


const rootReducer=combineReducers({
    userLogin:userLoginFetchReducer,
    spinner:spinnerReducer,
    adminLogedin:adminLoginFetchReducer,
    productAddAdmin:productAddReducer,
    productListAdmin:productShowReducer,
    productOneAdmin:oneProductShowAdminReducer,
    productUpdateAdmin:productUpdateReducer
})


const store=createStore(rootReducer, applyMiddleware(thunk));


export default store;