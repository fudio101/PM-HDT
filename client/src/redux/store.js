import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";
import filtersSlice from "./reducers/filtersSlice";
import latestComicsSlice from "./reducers/latestComicsSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        filters: filtersSlice.reducer,
        latestComics: latestComicsSlice.reducer,
    },
});

export default store;
