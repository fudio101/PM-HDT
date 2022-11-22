import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authorReducer from "./slices/authorSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    author: authorReducer,
    category: categoryReducer,
  },
});
export default store;
