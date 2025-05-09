// src/GamesPage.tsx

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Matches from "./components/Matches";
import { filterLeague } from "./api";
import { matchesType } from "./types";

const GamesPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("Premier League");
  const [matches, setMatches] = useState<matchesType[]>([]);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await filterLeague(selectedLeague);
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    loadMatches();
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
  matches.map((match, index) => {
    const dateObj = new Date(match.utcDate);
    const formattedMatch = {
      league: match.competition.name,
      leagueLogo: "/premier-league.png", // Ideally map logos based on league name
      leagueColor: "text-green-400",     // Optionally add logic for dynamic color
      date: dateObj.toDateString(),
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeLogo: match.homeTeam.crest,
      awayLogo: match.awayTeam.crest,
      time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return <Matches key={index} {...formattedMatch} />;
  })
) : (
  <p className="text-gray-400">No matches available for this league.</p>
)}

        </div>
      </div>
    </div>
  );
};

export default GamesPage;
