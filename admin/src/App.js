import React from "react";
import { Route, Routes } from "react-router-dom";

import HeaderSection from "./components/layouts/header/HeaderSection";
import Layout from "./components/layouts/Layout";
import DashBoardPage from "./pages/DashBoardPage";

function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path="/admin.dashboard" element={<HeaderSection />} />
        <Route path="*" element={<HeaderSection />} /> */}
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
