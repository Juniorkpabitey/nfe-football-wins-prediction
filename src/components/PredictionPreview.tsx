import React from "react";

const PredictionPreview: React.FC = () => {
  return (
    <section className="py-20 px-6 text-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <h2 className="text-3xl font-bold mb-8">Sample Prediction</h2>
      <div className="bg-gray-800 mx-auto max-w-md rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Barcelona vs Real Madrid</h3>
        <div className="w-full bg-gray-700 h-5 rounded-full overflow-hidden mb-2">
          <div className="bg-primary h-full" style={{ width: "64%" }} />
        </div>
        <p className="text-gray-300 text-sm">Prediction: 64% chance of Barcelona win</p>
      </div>
    </section>
  );
};

export default PredictionPreview;
