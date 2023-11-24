
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";


  export const rootReducer = combineReducers({
    userDetail: userReducer,
    productDetail: productReducer,
  });
    
  

