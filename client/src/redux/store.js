import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import categoriesSlice from "./reducers/categoriesSlice";
import searchComicsSlice from "./reducers/searchComicsSlice";
import latestComicsSlice from "./reducers/latestComicsSlice";
import categoryComicsSlice from "./reducers/categoryComicsSlice";
import chapterSlice from "./reducers/chapterSlice";
import countriesSlice from "./reducers/countriesSlice";
import readComicListSlice from "./reducers/readComicList";
import comicRankingsSlice from "./reducers/comicRankingsSlice";
import userSlice from "./reducers/userSlice";
import subscriptionsSlice from "./reducers/subscriptionsSlice";

const rootReducer = combineReducers({
    categories: categoriesSlice.reducer,
    countries: countriesSlice.reducer,
    searchComics: searchComicsSlice.reducer,
    latestComics: latestComicsSlice.reducer,
    categoryComics: categoryComicsSlice.reducer,
    chapter: chapterSlice.reducer,
    readComicList: readComicListSlice.reducer,
    comicRankings: comicRankingsSlice.reducer,
    user: userSlice.reducer,
    subscriptions: subscriptionsSlice.reducer,
});

const persistConfig = {
    key: "comicClient",
    storage,
    whitelist: ["readComicList"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
                // Ignore these field paths in all actions
                // ignoredActionPaths: ["meta.arg", "payload.timestamp"],
                // Ignore these paths in the state
                // ignoredPaths: ["items.dates"],
            },
        }),
});

export default store;
