import React from "react";

interface MatchCardProps {
  league: string;
  leagueLogo: string;
  leagueColor: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  time: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  league,
  leagueLogo,
  leagueColor,
  date,
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  time,
}) => {
  return (
    <div className="bg-[#2C2F38] rounded-lg p-4 space-y-2 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#3A3D46] rounded px-3 py-1">
        <div className="flex items-center gap-2">
          <img src={leagueLogo} alt={league} className="w-4 h-4" />
          <span className={`${leagueColor} text-sm font-semibold`}>{league}</span>
        </div>
        <span className="text-xs text-gray-300">{date}</span>
      </div>

      {/* Teams and Time */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <img src={homeLogo} alt={homeTeam} className="w-5 h-5" />
          <span>{homeTeam}</span>
        </div>
        <span className="bg-[#4A5568] px-3 py-1 rounded text-teal-300 font-bold text-xs">
          {time}
        </span>
        <div className="flex items-center gap-2">
          <span>{awayTeam}</span>
          <img src={awayLogo} alt={awayTeam} className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
