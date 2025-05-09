import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MatchCard from "./components/MatchCard";

interface Match {
  id: string;
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

const GamesPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("Premier League");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const dummyMatches: Match[] = [
      {
        id: "1",
        league: "Premier League",
        leagueLogo: "/premier-league.png",
        leagueColor: "text-blue-500",
        date: "2025-05-09",
        homeTeam: "Manchester United",
        awayTeam: "Chelsea",
        homeLogo: "/manutd.png",
        awayLogo: "/chelsea.png",
        time: "19:00",
      },
    ];
    setMatches(dummyMatches);
  }, [selectedLeague]);

  return (
    <div className="flex min-h-screen bg-[#1E1F26] text-white">
      <Sidebar
        selectedLeague={selectedLeague}
        onSelectLeague={(leagueName) => setSelectedLeague(leagueName)}
      />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold uppercase">Matches</h2>
          <button className="bg-gray-700 px-4 py-2 rounded text-sm text-white">
            {new Date().toDateString()}
          </button>
        </div>

        <div className="space-y-4 mt-6">
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <MatchCard
                key={index}
                league={match.league}
                leagueLogo={match.leagueLogo}
                leagueColor={match.leagueColor}
                date={match.date}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeLogo={match.homeLogo}
                awayLogo={match.awayLogo}
                time={match.time}
              />
            ))
          ) : (
            <p className="text-gray-400">No matches available for this league.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
