import React from "react";
//import Navbar from "./src/components/Navbar"; 
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import PredictionPreview from "./components/PredictionPreview";
import CTAsection from "./components/CTAsection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
//import Navbar from "./components/Navbar";      <Navbar />


const LandingPage: React.FC = () => {
  return (
    <div className="bg-dark text-white font-sans">
      <Hero />
      <HowItWorks />
      <Features />
      <PredictionPreview />
      <CTAsection />
      <Footer />
    </div>
  );
};

export default LandingPage;
