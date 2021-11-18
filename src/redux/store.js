import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { adminLoginFetchReducer } from "./admin/adminLoginReducer";
import { userLoginFetchReducer } from "./user/logincheckReducer";
import { spinnerReducer } from "./user/spinnerLoading";
import { productAddReducer } from "./admin/productAdd";
import { productShowReducer } from "./admin/showAllProduct";
import { productUpdateReducer } from "./admin/productUpdate";
import { listCategoryHomeReducer } from "./home/categoryList";
import { fetchProductDetailsHomeReducer } from "./home/productDetails";
import { fetchAllCatgoryProductReducer } from "./home/AllProduct";

import { composeWithDevTools } from "redux-devtools-extension";
import { subCategoryListReducer } from "./home/AllProductSub";

const rootReducer = combineReducers({
  // user
  userLogin: userLoginFetchReducer,
  spinner: spinnerReducer,

  // admin
  adminLogedin: adminLoginFetchReducer,
  productAddAdmin: productAddReducer,
  productListAdmin: productShowReducer,
  productUpdateAdmin: productUpdateReducer,

  // home
  categoryList: listCategoryHomeReducer,
  productDetailsHome: fetchProductDetailsHomeReducer,
  productByCategory: fetchAllCatgoryProductReducer,
  productBySubCat: subCategoryListReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
