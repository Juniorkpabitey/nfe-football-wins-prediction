import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MatchCard from "./components/Match-Card";
import MatchTabs from "./components/MatchTabs";
import { fetchMatchesByLeague } from "./api";

interface Match {
  fixture: {
    date: string;
  };
  league: {
    name: string;
    logo: string;
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  leagueColor: string;
  time: string;
}

const leagueMapping: { [key: string]: number } = {
  "Premier League": 39,
  "Primera Division": 140,
  "Bundesliga": 78,
  "Serie A": 135,
  "Ligue 1": 61,
  "Championship": 40,
  "Brazilian Championship Series A": 71,
};

const GamesPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("Premier League");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const loadMatches = async () => {
      const leagueId = leagueMapping[selectedLeague];
      if (!leagueId) return;

      const data = await fetchMatchesByLeague(leagueId);
      setMatches(data);
    };
    loadMatches();
  }, [selectedLeague]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString()
      ? "Today"
      : date.toDateString();
  };

  return (
    <div className="flex min-h-screen bg-[#1E1F26] text-white">
      <Sidebar
        selectedLeague={selectedLeague}
        onSelectLeague={(leagueName) => setSelectedLeague(leagueName)}
      />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">MATCHES</h2>
          <button className="bg-gray-700 px-4 py-2 rounded text-sm text-white">
            {new Date().toDateString()}
          </button>
        </div>
        <MatchTabs />
        <div className="space-y-4 mt-4">
          {matches.map((match, index) => (
            <MatchCard
              key={index}
              league={match.league.name}
              leagueColor="text-green-400"
              leagueLogo={match.league.logo || ""}
              date={formatDate(match.fixture.date)}
              homeTeam={match.teams.home.name}
              awayTeam={match.teams.away.name}
              homeLogo={match.teams.home.logo}
              awayLogo={match.teams.away.logo}
              time={new Date(match.fixture.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
