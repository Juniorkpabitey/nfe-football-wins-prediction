import { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FaFutbol, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const FOOTBALL_API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.href;
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Football Predictor Pro";

const footballLeagues = [
  { name: "Premier League", id: 39 },
  { name: "La Liga", id: 140 },
  { name: "Serie A", id: 135 },
  { name: "Bundesliga", id: 78 },
  { name: "Ligue 1", id: 61 },
  { name: "MLS", id: 253 },
  { name: "Championship", id: 40 },
  { name: "Copa Libertadores", id: 13 },
];

const bettingPlatforms = [
  { name: "ilobet", url: "https://www.ilobet.com", color: "text-blue-400" },
  { name: "BangBet", url: "https://www.bangbet.com", color: "text-purple-400" },
  { name: "1xBet", url: "https://1xbet.com", color: "text-green-400" },
  { name: "Betway", url: "https://www.betway.com", color: "text-yellow-400" },
  { name: "Bet365", url: "https://www.bet365.com", color: "text-red-400" },
];

const SYSTEM_PROMPT = `You are an expert football analyst AI. Analyze these factors for prediction:
- Last 5 matches performance for both teams
- Head-to-head statistics
- Current league position
- Injury reports and key player availability
- Home/away performance
- Recent tactical formations
- Weather conditions
- Referee statistics

Provide prediction with this EXACT format:

**Match Prediction**  
[Home Team] vs [Away Team] - [Date] [Time]  

**Predicted Winner**: [Team] (Confidence: [X]%)  

**Key Factors**:  
- Factor 1  
- Factor 2  
- Factor 3  

**Tactical Analysis**:  
[Detailed tactical breakdown]  

**Recommended Bet**: [Bet type] @ [Odds]  
Available at: [Betting Platform Links]  

**Risk Assessment**: [Risk level and explanation]  

Use bold for section headers and proper markdown formatting. Include current statistics and form.`;

interface Message {
  type: "userMsg" | "responseMsg";
  text: string;
}

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
}

const PredictionPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLeague, setSelectedLeague] = useState(footballLeagues[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isFetchingMatches, setIsFetchingMatches] = useState(false);

  // Fetch matches when league changes
  useEffect(() => {
    const fetchMatches = async () => {
      setIsFetchingMatches(true);
      try {
        // Using API-Football (https://www.api-football.com/)
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?league=${selectedLeague.id}&next=10`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": FOOTBALL_API_KEY,
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();
        interface ApiMatch {
          fixture: {
            id: number;
            date: string;
            venue?: { name: string };
          };
          teams: {
            home: { name: string };
            away: { name: string };
          };
        }

        const formattedMatches = data.response.map((match: ApiMatch) => ({
          id: match.fixture.id,
          homeTeam: match.teams.home.name,
          awayTeam: match.teams.away.name,
          date: new Date(match.fixture.date).toLocaleDateString(),
          time: new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          venue: match.fixture.venue?.name || "Unknown venue",
        }));

        setMatches(formattedMatches);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Could not load upcoming matches. Using default data.");
        // Fallback to some sample matches if API fails
        setMatches([
          {
            id: 1,
            homeTeam: "Sample Team A",
            awayTeam: "Sample Team B",
            date: new Date().toLocaleDateString(),
            time: "15:00",
            venue: "Sample Stadium",
          },
        ]);
      } finally {
        setIsFetchingMatches(false);
      }
    };

    fetchMatches();
  }, [selectedLeague]);

  const generatePrediction = async (userPrompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!API_KEY) {
        throw new Error("API configuration error");
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            { 
              role: "system", 
              content: SYSTEM_PROMPT 
            },
            { 
              role: "user", 
              content: `${selectedLeague.name} match prediction request:\n${userPrompt}\n\nCurrent matches: ${JSON.stringify(matches.slice(0, 3))}` 
            }
          ],
          temperature: 0.3,
          max_tokens: 1500,
          top_p: 0.9,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.error("API Error:", err);
      setError(err instanceof Error ? err.message : "Prediction failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredictionRequest = async (match?: Match) => {
    const query = match 
      ? `${match.homeTeam} vs ${match.awayTeam} on ${match.date} at ${match.time}`
      : message;

    if (!query.trim()) {
      setError("Please enter or select a match");
      return;
    }

    try {
      const prediction = await generatePrediction(query);
      setMessages(prev => [
        ...prev,
        { type: "userMsg", text: query },
        { type: "responseMsg", text: prediction }
      ]);
      setMessage("");
    } catch {
      // Error handled in generatePrediction
    }
  };

  const newChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="w-screen min-h-screen bg-[#0E0E0E] text-white overflow-x-hidden flex flex-col">
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <FaFutbol className="text-2xl text-green-500" />
            <h1 className="text-xl md:text-2xl font-bold">Football Predictor Pro</h1>
          </div>
          {messages.length > 0 && (
            <button onClick={newChat} className="bg-[#181818] px-4 py-2 text-sm rounded-full hover:bg-[#222222]">
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto px-4 py-6">
        {/* League Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {footballLeagues.map((league) => (
            <motion.button
              key={league.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLeague(league)}
              className={`px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm rounded-full ${
                selectedLeague.id === league.id
                  ? "bg-green-500 text-black font-bold"
                  : "bg-[#181818] hover:bg-[#262626] text-gray-300"
              }`}
            >
              {league.name}
            </motion.button>
          ))}
        </div>

        {/* Upcoming Matches */}
        {messages.length === 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {isFetchingMatches ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Loading {selectedLeague.name} Matches...
                </>
              ) : (
                `Upcoming ${selectedLeague.name} Matches`
              )}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#181818] p-4 rounded-lg border border-gray-700 cursor-pointer"
                  onClick={() => handlePredictionRequest(match)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">{match.date}</span>
                    <span className="text-gray-400 text-sm">{match.time}</span>
                  </div>
                  <div className="text-center py-2">
                    <div className="font-bold text-lg">{match.homeTeam}</div>
                    <div className="text-gray-400 text-sm">vs</div>
                    <div className="font-bold text-lg">{match.awayTeam}</div>
                  </div>
                  <div className="text-gray-400 text-sm text-center mt-2">
                    {match.venue}
                  </div>
                  <button 
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePredictionRequest(match);
                    }}
                  >
                    Predict This Match
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Betting Platforms */}
        {messages.length === 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Recommended Betting Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {bettingPlatforms.map((platform, index) => (
                <motion.a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#181818] p-4 rounded-lg hover:bg-[#222222] transition-colors flex flex-col items-center"
                >
                  <FaFutbol className={`text-2xl mb-2 ${platform.color}`} />
                  <span className="font-medium">{platform.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Response Display */}
        {messages.length > 0 && (
          <div className="flex-1 mb-6 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-[#181818] text-white p-4 md:p-6 rounded-2xl ${
                  msg.type === "userMsg" ? "ml-auto max-w-[80%]" : "mr-auto max-w-[90%]"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {msg.type === "responseMsg" && <FaFutbol className="text-green-500" />}
                  <h3 className="font-semibold">
                    {msg.type === "userMsg" ? "Your Query" : "AI Prediction"}
                  </h3>
                </div>
                {msg.type === "responseMsg" ? (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-green-400" {...props} />,
                        h2: ({...props}) => <h2 className="text-lg font-bold mt-3 mb-1 text-green-400" {...props} />,
                        h3: ({...props}) => <h3 className="text-md font-bold mt-2 text-green-300" {...props} />,
                        p: ({...props}) => <p className="my-2 leading-relaxed" {...props} />,
                        strong: ({...props}) => <strong className="font-bold text-green-300" {...props} />,
                        em: ({...props}) => <em className="italic" {...props} />,
                        ul: ({...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                        ol: ({...props}) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
                        li: ({...props}) => <li className="my-1" {...props} />,
                        a: ({...props}) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Input Container */}
        <div className="sticky bottom-0 bg-[#0E0E0E] pt-4 pb-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 mb-2 text-sm"
            >
              {error}
            </motion.div>
          )}
          
          <div className="bg-[#181818] flex items-center py-3 px-4 rounded-full border border-[#2e2e2e]">
            <input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError(null);
              }}
              type="text"
              placeholder="Enter match or select from above"
              className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handlePredictionRequest()}
              disabled={isLoading}
            />
            <button 
              onClick={() => handlePredictionRequest()}
              disabled={isLoading}
              className="text-green-500 text-2xl p-2 hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Predict match"
            >
              {isLoading ? (
                <div className="animate-spin h-6 w-6 border-2 border-green-500 rounded-full border-t-transparent"></div>
              ) : (
                <IoSend />
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PredictionPage;