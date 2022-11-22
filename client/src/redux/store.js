import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
    },
});

export default store;
