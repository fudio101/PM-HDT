import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";
import filtersSlice from "./reducers/filtersSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        filters: filtersSlice.reducer,
    },
});

export default store;
