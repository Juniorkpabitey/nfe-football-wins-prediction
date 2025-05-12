import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FiClock, FiCalendar } from "react-icons/fi";

interface League {
  id: number;
  name: string;
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
}

interface Match {
  id: number;
  leagueId: number;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    logo: string;
  };
  startTimestamp: number;
  homeScore?: number;
  awayScore?: number;
  status: string;
  time?: string;
}

const GamesPage = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [expandedLeagues, setExpandedLeagues] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date] = useState(new Date());

  // Fetch popular leagues (similar to SofaScore's top leagues)
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        // This is a mock implementation - in production you would use SofaScore's API
        const mockLeagues: League[] = [
          {
            id: 1,
            name: "Premier League",
            slug: "premier-league",
            primaryColor: "#3D195B",
            secondaryColor: "#04E5B5",
            logo: "https://api.sofascore.app/api/v1/unique-tournament/1/image/dark"
          },
          {
            id: 2,
            name: "La Liga",
            slug: "la-liga",
            primaryColor: "#EB1D36",
            secondaryColor: "#F8F8F8",
            logo: "https://api.sofascore.app/api/v1/unique-tournament/8/image/dark"
          },
          {
            id: 3,
            name: "Serie A",
            slug: "serie-a",
            primaryColor: "#1A5DAD",
            secondaryColor: "#9BC4E2",
            logo: "https://api.sofascore.app/api/v1/unique-tournament/23/image/dark"
          },
          {
            id: 4,
            name: "Bundesliga",
            slug: "bundesliga",
            primaryColor: "#D20515",
            secondaryColor: "#F8F8F8",
            logo: "https://api.sofascore.app/api/v1/unique-tournament/35/image/dark"
          },
          {
            id: 5,
            name: "Ligue 1",
            slug: "ligue-1",
            primaryColor: "#DA291C",
            secondaryColor: "#1E63B0",
            logo: "https://api.sofascore.app/api/v1/unique-tournament/34/image/dark"
          },
          {
            id: 6,
            name: "Champions League",
            slug: "champions-league",
            primaryColor: "#1579F0",
            secondaryColor: "#F8F8F8",
            logo: "https://api.sofascore.app/api/v1/unique-tournament/7/image/dark"
          }
        ];

        setLeagues(mockLeagues);
        setSelectedLeague(mockLeagues[0]);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, []);

  // Fetch matches for selected league and date
  useEffect(() => {
    const fetchMatches = async () => {
      if (!selectedLeague) return;

      setIsLoading(true);
      try {
        // Mock implementation - replace with actual SofaScore API calls
        const mockMatches: Match[] = [
          {
            id: 1,
            leagueId: selectedLeague.id,
            homeTeam: {
              id: 1,
              name: "Manchester United",
              shortName: "MUN",
              logo: "https://api.sofascore.app/api/v1/team/1/image"
            },
            awayTeam: {
              id: 2,
              name: "Liverpool",
              shortName: "LIV",
              logo: "https://api.sofascore.app/api/v1/team/2/image"
            },
            startTimestamp: Math.floor(new Date().getTime() / 1000) + 3600,
            status: "NS",
            time: "19:45"
          },
          {
            id: 2,
            leagueId: selectedLeague.id,
            homeTeam: {
              id: 3,
              name: "Arsenal",
              shortName: "ARS",
              logo: "https://api.sofascore.app/api/v1/team/3/image"
            },
            awayTeam: {
              id: 4,
              name: "Chelsea",
              shortName: "CHE",
              logo: "https://api.sofascore.app/api/v1/team/4/image"
            },
            startTimestamp: Math.floor(new Date().getTime() / 1000) + 7200,
            status: "NS",
            time: "20:00"
          },
          {
            id: 3,
            leagueId: selectedLeague.id,
            homeTeam: {
              id: 5,
              name: "Manchester City",
              shortName: "MCI",
              logo: "https://api.sofascore.app/api/v1/team/5/image"
            },
            awayTeam: {
              id: 6,
              name: "Tottenham",
              shortName: "TOT",
              logo: "https://api.sofascore.app/api/v1/team/6/image"
            },
            startTimestamp: Math.floor(new Date().getTime() / 1000) + 10800,
            homeScore: 2,
            awayScore: 1,
            status: "LIVE",
            time: "HT"
          }
        ];

        setMatches(mockMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [selectedLeague, date]);

  const toggleFavorite = (leagueId: number) => {
    setFavorites(prev =>
      prev.includes(leagueId)
        ? prev.filter(id => id !== leagueId)
        : [...prev, leagueId]
    );
  };

  const toggleLeagueExpand = (leagueId: number) => {
    setExpandedLeagues(prev =>
      prev.includes(leagueId)
        ? prev.filter(id => id !== leagueId)
        : [...prev, leagueId]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="flex min-h-screen bg-[#1a1c22] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#222430] border-r border-[#2d303d] p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Football</h2>
          <button className="text-gray-400 hover:text-white">
            <FiCalendar size={18} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-400">FAVORITES</h3>
            <button className="text-gray-400 hover:text-white">
              <IoIosArrowForward size={14} />
            </button>
          </div>
          {leagues
            .filter(league => favorites.includes(league.id))
            .map(league => (
              <div
                key={league.id}
                className={`flex items-center justify-between p-2 rounded-md mb-1 ${
                  selectedLeague?.id === league.id
                    ? "bg-[#2d303d]"
                    : "hover:bg-[#2d303d]"
                }`}
                onClick={() => setSelectedLeague(league)}
              >
                <div className="flex items-center">
                  <img
                    src={league.logo}
                    alt={league.name}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm">{league.name}</span>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(league.id);
                  }}
                  className="text-yellow-400"
                >
                  <FaStar size={14} />
                </button>
              </div>
            ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-400">ALL LEAGUES</h3>
            <button className="text-gray-400 hover:text-white">
              <IoIosArrowForward size={14} />
            </button>
          </div>
          {leagues.map(league => (
            <div key={league.id}>
              <div
                className={`flex items-center justify-between p-2 rounded-md mb-1 ${
                  selectedLeague?.id === league.id
                    ? "bg-[#2d303d]"
                    : "hover:bg-[#2d303d]"
                }`}
                onClick={() => setSelectedLeague(league)}
              >
                <div className="flex items-center">
                  <img
                    src={league.logo}
                    alt={league.name}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm">{league.name}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(league.id);
                    }}
                    className="text-gray-400 hover:text-yellow-400 mr-2"
                  >
                    {favorites.includes(league.id) ? (
                      <FaStar size={14} />
                    ) : (
                      <FaRegStar size={14} />
                    )}
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleLeagueExpand(league.id);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    {expandedLeagues.includes(league.id) ? (
                      <FaChevronUp size={12} />
                    ) : (
                      <FaChevronDown size={12} />
                    )}
                  </button>
                </div>
              </div>
              {expandedLeagues.includes(league.id) && (
                <div className="pl-8 mb-2">
                  <div className="text-xs text-gray-400 p-1 hover:bg-[#2d303d] rounded">
                    Standings
                  </div>
                  <div className="text-xs text-gray-400 p-1 hover:bg-[#2d303d] rounded">
                    Top Scorers
                  </div>
                  <div className="text-xs text-gray-400 p-1 hover:bg-[#2d303d] rounded">
                    Fixtures
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{selectedLeague?.name}</h1>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              <FiClock className="mr-1" />
              <span>{formatDate(date)}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-[#2d303d] px-4 py-2 rounded text-sm">
              Fixtures
            </button>
            <button className="bg-[#2d303d] px-4 py-2 rounded text-sm">
              Standings
            </button>
            <button className="bg-[#2d303d] px-4 py-2 rounded text-sm">
              Stats
            </button>
          </div>
        </div>

        {/* Matches */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : matches.length > 0 ? (
          <div className="space-y-3">
            {matches.map(match => (
              <div
                key={match.id}
                className="bg-[#222430] rounded-lg p-4 border border-[#2d303d] hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded mr-2 ${
                        match.status === "LIVE"
                          ? "bg-red-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {match.status === "LIVE" ? "LIVE" : match.time}
                    </span>
                    <span className="text-sm text-gray-400">
                      {formatTime(match.startTimestamp)}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <FaRegStar size={14} />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center w-2/5">
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.name}
                      className="w-8 h-8 mr-3"
                    />
                    <span className="font-medium">{match.homeTeam.shortName}</span>
                  </div>

                  <div className="flex items-center justify-center w-1/5">
                    {match.status === "LIVE" ? (
                      <div className="flex items-center">
                        <span className="text-xl font-bold mx-2">
                          {match.homeScore}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span className="text-xl font-bold mx-2">
                          {match.awayScore}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">vs</span>
                    )}
                  </div>

                  <div className="flex items-center justify-end w-2/5">
                    <span className="font-medium mr-3">{match.awayTeam.shortName}</span>
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.name}
                      className="w-8 h-8"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">No matches scheduled for this date.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;