import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { adminLoginFetchReducer } from "./admin/adminLoginReducer";
import { userLoginFetchReducer } from "./user/logincheckReducer";
import { spinnerReducer } from "./user/spinnerLoading";
import { productShowReducer } from "./admin/showAllProduct";
import { listCategoryHomeReducer } from "./home/categoryList";
import { fetchProductDetailsHomeReducer } from "./home/productDetails";
import { fetchAllCatgoryProductReducer } from "./home/AllProduct";
import { cartReducer } from "./user/cartReducer";
import { addressReducer } from "./user/addressReducer";

import { composeWithDevTools } from "redux-devtools-extension";
import { subCategoryListReducer } from "./home/AllProductSub";
import { tempReducer } from "./user/tempFile";
import { adminOfferReducer } from "./admin/offerReducer";

const rootReducer = combineReducers({
  // user
  userLogin: userLoginFetchReducer,
  spinner: spinnerReducer,
  cart: cartReducer,
  address:addressReducer,
  temp:tempReducer,

  // admin
  adminLogedin: adminLoginFetchReducer,
  productListAdmin: productShowReducer,
  adminOffer:adminOfferReducer,
  
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
