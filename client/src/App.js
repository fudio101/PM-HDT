import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import HomePage from "./pages/HomePage";
import SearchComicsPage from "./pages/SearchComicsPage";
import CategoryPage from "./pages/CategoryPage";
import ComicIntroPage from "./pages/ComicIntroPage";
import ChapterPage from "./pages/ChapterPage";
import RankPage from "./pages/RankPage";
import { useDispatch } from "react-redux";
import { getCategoryList } from "./redux/reducers/categoriesSlice";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LatestComicsPage from "./pages/LatestComicsPage";
import CategoryComicsPage from "./pages/CategoryComicsPage";
import { getCountryList } from "./redux/reducers/countriesSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryList());
        dispatch(getCountryList());
    }, [dispatch]);

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/comic/:comicSlug" element={<ComicIntroPage />} />
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
                <Route
                    path="/search/:searchKey"
                    element={<SearchComicsPage />}
                />
                <Route path="/cate/*" element={<SearchComicsPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route
                    path="/category/:categoryId"
                    element={<CategoryComicsPage />}
                />
                <Route path="/popular" element={<RankPage />} />
                <Route path="/lastest" element={<LatestComicsPage />} />
                <Route
                    path="/chapter/:comicSlug/:chapter"
                    element={<ChapterPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
