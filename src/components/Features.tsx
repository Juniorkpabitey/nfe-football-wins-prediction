import React from "react";

const Features: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gray-950">
      <h2 className="text-3xl font-bold text-center mb-12">Why NFE?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-gray-300">
        <div className="p-4 bg-gray-800 rounded-xl">
          <h4 className="text-lg font-semibold text-primary mb-2">Smart Predictions</h4>
          <p>Our engine leverages machine learning for accurate match outcomes.</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-xl">
          <h4 className="text-lg font-semibold text-primary mb-2">Team Insights</h4>
          <p>Compare recent forms, player stats, and team dynamics.</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-xl">
          <h4 className="text-lg font-semibold text-primary mb-2">Live Updates</h4>
          <p>Real-time changes as lineups and match data evolve.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
