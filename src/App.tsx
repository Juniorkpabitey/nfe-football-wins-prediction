import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./LandingPage";
import PredictionPage from "./PredictionPage";
import GamesPage from "./GamesPage"; 

const App: React.FC = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/predict" element={<PredictionPage />} />
      <Route path="/games" element={<GamesPage />} />

    </Routes>
    </>
  );
};

export default App;
