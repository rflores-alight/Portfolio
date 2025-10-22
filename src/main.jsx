import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CaseStudyPage from "./CaseStudyPage";
import Layout from "./Layout";
import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteChangeTracker from './RouteChangeTracker'; // your tracker file

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* GA route-change tracking (must be inside the Router, mounted once) */}
      <RouteChangeTracker />

      {/* Your routes */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

