import React from "react";

const PredictionPreview: React.FC = () => {
  return (
    <section className="py-20 px-6 text-center bg-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-black">Sample Prediction</h2>
      
      <div className="bg-black mx-auto max-w-md rounded-xl p-6 shadow-lg">
        {/* Match Info with Logos */}
        <div className="flex items-center justify-between mb-4">
          <img src="/barcelona.png" alt="Barcelona Logo" className="w-20 h-20 object-contain" />
          <h3 className="text-xl font-semibold text-white mx-2">Barcelona vs Real Madrid</h3>
          <img src="/Madrid.png" alt="Real Madrid Logo" className="w-20 h-20 object-contain" />
        </div>

        {/* Prediction Bar */}
        <div className="w-full bg-gray-700 h-5 rounded-full overflow-hidden mb-2">
          <div className="bg-green-400 h-full" style={{ width: "64%" }} />
        </div>

        <p className="text-white text-sm">Prediction: 64% chance of Barcelona win</p>
      </div>
    </section>
  );
};

export default PredictionPreview;
