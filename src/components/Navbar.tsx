import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          NFE
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link to="/games" className="hover:text-primary transition">
            Games
          </Link>
          <Link to="/predict" className="hover:text-primary transition">
            Predictions
          </Link>
          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
