import React from "react";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-primary text-black text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Predict Like a Pro?</h2>
      <p className="mb-6 text-lg">Join NFE today and get instant access to match forecasts.</p>
      <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900">
        Predict Now
      </button>
    </section>
  );
};

export default CTASection;
