import React, { useEffect } from "react";
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
import PackageManagementPage from "./pages/package/PackageManagementPage";
import PackageEditPage from "./pages/package/PackageEditPage";
import { getUserInfo } from "./store/actions/userAction";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";

import "react-toastify/ReactToastify.min.css";
import NewPackagePage from "./pages/package/NewPackagePage";
import ReceiptManagementPage from "./pages/receipt/ReceiptManagementPage";
import ReceiptView from "./pages/receipt/ReceiptView";

function App() {
  const dispatch = useDispatch();
  let location = useLocation();

  const getCurrUserInfo = async () => {
    if (location.pathname !== "/login") {
      const info = unwrapResult(await dispatch(getUserInfo()));
      if (info.role_id === 3) {
        localStorage.clear();
      }
      if (!localStorage.getItem("email")) {
        for (let [key, value] of Object.entries(info)) {
          localStorage.setItem(key, value);
        }
      }
    }
  };
  useEffect(() => {
    getCurrUserInfo();
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/comic-manage" element={<ComicManagementPage />} />
        <Route path="/category-manage" element={<CategoryManagementPage />} />
        <Route path="/user-manage" element={<UserManagementPage />} />
        <Route path="/new-comic" element={<NewComicPage />} />
        <Route path="/edit-comic/:id" element={<EditComicPage />} />
        <Route path="/new-chapter/:id" element={<NewChapterPage />} />
        <Route path="/author-manage" element={<AuthorManagementPage />} />
        <Route path="/packages-manage" element={<PackageManagementPage />} />
        <Route path="/new-packages" element={<NewPackagePage />} />
        <Route path="/edit-package/:id" element={<PackageEditPage />} />
        <Route path="/edit-package/:id" element={<PackageEditPage />} />
        <Route path="/receipt-manage" element={<ReceiptManagementPage />} />
        <Route path="/receipt-manage/:id" element={<ReceiptView />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
