import React from "react";
import { FaFutbol, FaRobot, FaChartLine } from "react-icons/fa";

const steps = [
  { icon: <FaFutbol className="text-white text-3xl mb-3" />, title: "Choose Teams" },
  { icon: <FaRobot className="text-white text-3xl mb-3" />, title: "AI Predicts" },
  { icon: <FaChartLine className="text-white text-3xl mb-3" />, title: "View Results" },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10 text-black">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="bg-black p-6 rounded-lg shadow-md text-white flex flex-col items-center">
            {step.icon}
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-300 text-center">
              We use AI models to analyze team stats, form, and more.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
