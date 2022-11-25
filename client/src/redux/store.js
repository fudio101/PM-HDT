import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";
import searchComicsSlice from "./reducers/searchComicsSlice";
import latestComicsSlice from "./reducers/latestComicsSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        searchComics: searchComicsSlice.reducer,
        latestComics: latestComicsSlice.reducer,
    },
});

export default store;
