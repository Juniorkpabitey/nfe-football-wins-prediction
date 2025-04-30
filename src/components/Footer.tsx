import React from "react";
import footballImg from "/football.png"; // Ensure the image exists

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 py-6 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between md:justify-center gap-10 md:gap-20">
        
        {/* Left Side - Football Image */}
        <div>
          <img
            src={footballImg}
            alt="Football"
            className="w-28 h-auto md:w-36"
          />
        </div>

        {/* Right Side - Text and CTA */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">NFE</h2>
          <p className="mt-2 text-sm max-w-sm">
            Predict with <span className="text-primary font-semibold">NFE</span> for the best football outcomes.
          </p>
          <button className="mt-4 bg-white text-black px-5 py-2 rounded-sm border border-white hover:bg-black hover:text-white transition duration-300">
          Try Now
        </button>

        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} NFE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
