import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./App";
import CaseStudyPage from "./CaseStudyPage";
import Layout from "./Layout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

export default function Root() { return <RouterProvider router={router} />; }
