import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import ComicIntroPage from "./pages/ComicIntroPage";
import ComicViewPage from "./pages/ComicViewPage";
import RankPage from "./pages/RankPage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/comic" element={<ComicIntroPage />} />
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
                <Route path="/search/:searchKey" element={<SearchPage />} />
                <Route path="/cate/*" element={<SearchPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/popular" element={<RankPage />} />
                <Route path="/lastest" element={<RankPage />} />
            </Route>
            <Route path="/chapter" element={<ComicViewPage />} />
        </Routes>
    );
}

export default App;
