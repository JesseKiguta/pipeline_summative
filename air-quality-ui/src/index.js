import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Predict from "./pages/Predict";
import Upload from "./pages/Upload";
import Retrain from "./pages/Retrain";
import Summary from "./pages/Summary";
import Visualizations from "./pages/Visualizations";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/retrain" element={<Retrain />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/visualizations" element={<Visualizations />} />
    </Routes>
  </Router>
);
