// components/MatchCard.tsx
import React, { useState } from "react";

interface MatchCardProps {
  teamA: {
    name: string;
    logo: string;
    initialScore: number;
  };
  teamB: {
    name: string;
    logo: string;
    initialScore: number;
  };
  location: string;
  time: string;
  countdown: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  teamA,
  teamB,
  location,
  time,
  countdown,
}) => {
  const [scoreA, setScoreA] = useState(teamA.initialScore);
  const [scoreB, setScoreB] = useState(teamB.initialScore);

  return (
    <div className="bg-gray-1000 text-white rounded-lg shadow-md p-6 border border-white max-w-4xl mx-auto mb-6">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
        {/* Team A */}
        <div className="flex flex-col items-center space-y-2">
          <img src={teamA.logo} alt={teamA.name} className="w-16 h-16 object-contain" />
          <h2 className="font-bold text-lg">{teamA.name}</h2>
          <input
            type="number"
            value={scoreA}
            onChange={(e) => setScoreA(parseInt(e.target.value))}
            className="text-white w-12 text-center rounded px-1"
          />
        </div>

        {/* VS */}
        <div className="text-gray-400 font-bold text-xl">VS</div>

        {/* Team B */}
        <div className="flex flex-col items-center space-y-2">
          <img src={teamB.logo} alt={teamB.name} className="w-16 h-16 object-contain" />
          <h2 className="font-bold text-lg">{teamB.name}</h2>
          <input
            type="number"
            value={scoreB}
            onChange={(e) => setScoreB(parseInt(e.target.value))}
            className="text-white w-12 text-center rounded px-1"
          />
        </div>
      </div>

      {/* Match Details */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-300 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <span>📍</span>
          <p>{location}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span>⏰</span>
          <p>{time}</p>
          <span className="text-xs text-gray-400">({countdown})</span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
