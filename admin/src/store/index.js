import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authorReducer from "./slices/authorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    author: authorReducer,
  },
});
export default store;
