import { combineReducers } from "redux";
import { configureStore  } from "@reduxjs/toolkit";

import authSlice from "./authReducer";
import rootSlice from "./rootSlice";
import currentUserSlice from "./currentReducer";

const reducer = combineReducers({
  root: rootSlice,
  auth: authSlice,
  currentUser : currentUserSlice
});

const store = configureStore({
  reducer, 
});

export default store;
