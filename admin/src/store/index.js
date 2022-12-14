import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authorReducer from "./slices/authorSlice";
import categoryReducer from "./slices/categorySlice";
import comicReducer from "./slices/comicSlice";
import comicEPReducer from "./slices/comicEpSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    author: authorReducer,
    category: categoryReducer,
    comic: comicReducer,
    episode: comicEPReducer,
  },
});
export default store;
