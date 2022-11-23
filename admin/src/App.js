import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import DashBoardPage from "./pages/DashBoardPage";
import ComicManagementPage from "./pages/comic/ComicManagementPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import NewComicPage from "./pages/comic/NewComicPage";
import NewChapterPage from "./pages/comic/NewChapterPage";
import EditComicPage from "./pages/comic/EditComicPage";
import AuthPage from "./pages/auth/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthorManagementPage from "./pages/AuthorManagementPage";

import "react-toastify/ReactToastify.min.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/comic-manage" element={<ComicManagementPage />} />
        <Route path="/category-manage" element={<CategoryManagementPage />} />
        <Route path="/user-manage" element={<UserManagementPage />} />
        <Route path="/new-comic" element={<NewComicPage />} />
        <Route path="/edit-comic" element={<EditComicPage />} />
        <Route path="/new-chapter/:id" element={<NewChapterPage />} />
        <Route path="/author-manage" element={<AuthorManagementPage />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
