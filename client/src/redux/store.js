import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";
import searchComicsSlice from "./reducers/searchComicsSlice";
import latestComicsSlice from "./reducers/latestComicsSlice";
import categoryComicsSlice from "./reducers/categoryComicsSlice";
import chapterSlice from "./reducers/chapterSlice";
import countriesSlice from "./reducers/countriesSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        countries: countriesSlice.reducer,
        searchComics: searchComicsSlice.reducer,
        latestComics: latestComicsSlice.reducer,
        categoryComics: categoryComicsSlice.reducer,
        chapter: chapterSlice.reducer,
    },
});

export default store;
