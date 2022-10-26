import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import DashBoardPage from "./pages/DashBoardPage";
import ComicManagementPage from "./pages/ComicManagementPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import UserManagementPage from "./pages/UserManagementPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<DashBoardPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/comic-manage" element={<ComicManagementPage />} />
        <Route path="/category-manage" element={<CategoryManagementPage />} />
        <Route path="/user-manage" element={<UserManagementPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
