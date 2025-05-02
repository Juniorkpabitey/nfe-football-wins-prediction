import React from "react";

const MatchTabs: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <button className="bg-gray-700 px-3 py-1 rounded text-sm">All</button>
      <button className="bg-gray-800 px-3 py-1 rounded text-sm">Live</button>
      <button className="bg-gray-800 px-3 py-1 rounded text-sm">Upcoming</button>
    </div>
  );
};

export default MatchTabs;
