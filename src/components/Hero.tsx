import React from "react";
import footballImg from "/football.png"; // Make sure the image is in public folder

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center bg-gradient-to-r from-black via-black/80 to-white text-white">
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between h-full">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-left space-y-6 z-10 mt-10 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Predict Football Wins with NFE
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            AI-powered insights and real-time analytics to help you make smarter football predictions.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-sm font-semibold border border-white hover:bg-black hover:text-white transition duration-300">
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center z-10 mt-8 md:mt-0">
          <img
            src={footballImg}
            alt="Football Player"
            className="w-48 md:w-64 object-contain"
          />
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-white opacity-70 -z-10" />
    </section>
  );
};

export default Hero;
