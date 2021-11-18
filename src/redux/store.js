import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { adminLoginFetchReducer } from "./admin/adminLoginReducer";
import { userLoginFetchReducer } from "./user/logincheckReducer";
import { spinnerReducer } from "./user/spinnerLoading";
import { productAddReducer } from "./admin/productAdd";
import { productShowReducer } from "./admin/showAllProduct";
import { oneProductShowAdminReducer } from "./admin/showOneProduct";
import { productUpdateReducer } from "./admin/productUpdate";
import { listCategoryHomeReducer } from "./home/categoryList";
import { fetchProductDetailsHomeReducer } from "./home/productDetails";

const rootReducer = combineReducers({
  // user
  userLogin: userLoginFetchReducer,
  spinner: spinnerReducer,

  // admin
  adminLogedin: adminLoginFetchReducer,
  productAddAdmin: productAddReducer,
  productListAdmin: productShowReducer,
  productOneAdmin: oneProductShowAdminReducer,
  productUpdateAdmin: productUpdateReducer,

  // home
  categoryList: listCategoryHomeReducer,
  productDetailsHome: fetchProductDetailsHomeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
