// pages/PredictionPage.tsx
import React, { useState } from "react";
import MatchCard from "./components/MatchCard";

const PredictionPage: React.FC = () => {
  const [liveUpdates, setLiveUpdates] = useState(false);

  const matches = [
    {
      teamA: { name: "Barcelona", logo: "/barcelona.png", initialScore: 2 },
      teamB: { name: "Real Madrid", logo: "/Madrid.png", initialScore: 3 },
      location: "Little Caesars Arena, Detroit, MI",
      time: "11:30 PM GMT",
      countdown: "5 hours 4 minutes",
    },
    {
      teamA: { name: "Man City", logo: "/man-city.png", initialScore: 1 },
      teamB: { name: "Liverpool", logo: "/liverpool.png", initialScore: 1 },
      location: "Etihad Stadium, Manchester",
      time: "9:00 PM GMT",
      countdown: "2 hours 15 minutes",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-22 py-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold">May 1, 2025</h2>

        <div className="flex flex-wrap items-center gap-4">
          <select className="bg-black text-white px-3 py-2 rounded border border-white">
            <option>Select a model</option>
            <option>Model A</option>
            <option>Model B</option>
          </select>

          <label className="flex items-center space-x-2 text-sm">
            <span>Live Updates</span>
            <input
              type="checkbox"
              checked={liveUpdates}
              onChange={() => setLiveUpdates(!liveUpdates)}
              className="accent-white"
            />
          </label>
        </div>
      </div>

      {/* Match Cards */}
      {matches.map((match, index) => (
        <MatchCard key={index} {...match} />
      ))}
    </div>
  );
};

export default PredictionPage;
