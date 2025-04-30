import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {["Choose Teams", "AI Predicts", "View Results"].map((step, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary">{step}</h3>
            <p className="text-gray-300">We use AI models to analyze team stats, form, and more.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
