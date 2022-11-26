import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";
import searchComicsSlice from "./reducers/searchComicsSlice";
import latestComicsSlice from "./reducers/latestComicsSlice";
import categoryComicsSlice from "./reducers/categoryComicsSlice";
import chapterSlice from "./reducers/chapterSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        searchComics: searchComicsSlice.reducer,
        latestComics: latestComicsSlice.reducer,
        categoryComics: categoryComicsSlice.reducer,
        chapter: chapterSlice.reducer,
    },
});

export default store;
