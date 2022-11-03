import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import DashBoardPage from "./pages/DashBoardPage";
import ComicManagementPage from "./pages/ComicManagementPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import NewComicPage from "./pages/NewComicPage";
import NewChapterPage from "./pages/NewChapterPage";
import EditComicPage from "./pages/EditComicPage";
import AuthPage from "./pages/auth/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

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
        <Route path="/new-chapter" element={<NewChapterPage />} />
      </Route>
      <Route path="/admin" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
