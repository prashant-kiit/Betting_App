import { configureStore } from "@reduxjs/toolkit";
import matchReducers from "./matchSlice.js"
const store = configureStore({
  reducer: matchReducers,
});

export default store;
