import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaFutbol } from "react-icons/fa";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.href;
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Football Predictor Pro";

const footballLeagues = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "MLS",
  "Championship",
  "Copa Libertadores",
];

const bettingPlatforms = [
  { 
    name: "ilobet", 
    url: "https://www.ilobet.com",
    color: "text-blue-400"
  },
  { 
    name: "BangBet", 
    url: "https://www.bangbet.com",
    color: "text-purple-400"
  },
  { 
    name: "1xBet", 
    url: "https://1xbet.com",
    color: "text-green-400"
  },
  { 
    name: "Betway", 
    url: "https://www.betway.com",
    color: "text-yellow-400"
  },
  { 
    name: "Bet365", 
    url: "https://www.bet365.com",
    color: "text-red-400"
  },
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
[Team] vs [Team] - [Date]  

**Predicted Winner**: [Team] (Confidence: [X]%)  

**Key Factors**:  
- Factor 1  
- Factor 2  
- Factor 3  

**Tactical Analysis**:  
[Detailed tactical breakdown]  

**Recommended Bet**: [Bet type] @ [Odds] (if requested)  
Available at: [Betting Platform Links]  

**Risk Assessment**: [Risk level and explanation]  

Use bold for section headers and proper markdown formatting. Include betting platform recommendations when appropriate.`;

interface Message {
  type: "userMsg" | "responseMsg";
  text: string;
}

const PredictionPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLeague, setSelectedLeague] = useState(footballLeagues[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePrediction = async (userPrompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!API_KEY) {
        throw new Error("API configuration error - please check your environment variables");
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
              content: `${selectedLeague} match prediction request:\n${userPrompt}` 
            }
          ],
          temperature: 0.3,
          max_tokens: 1500,
          top_p: 0.9,
          frequency_penalty: 0.2,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get prediction');
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.error("API Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredictionRequest = async () => {
    if (!message.trim()) {
      setError("Please enter a match query");
      return;
    }
    
    const fullQuery = `Analyze this match: ${message}
    Provide prediction with:
    - Predicted winner with confidence percentage
    - Key factors affecting the outcome
    - Tactical analysis
    - Potential scoreline
    - Betting recommendation with odds and suggested platforms`;

    try {
      const prediction = await generatePrediction(fullQuery);
      setMessages(prev => [
        ...prev,
        { type: "userMsg", text: message },
        { type: "responseMsg", text: prediction }
      ]);
      setMessage("");
    } catch {
      // Error already handled in generatePrediction
    }
  };

  const newChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="w-screen min-h-screen bg-[#0E0E0E] text-white overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <FaFutbol className="text-2xl text-green-500" />
            <h1 className="text-xl md:text-2xl font-bold"> NFE Football Predictor</h1>
          </div>
          {messages.length > 0 && (
            <button
              onClick={newChat}
              className="bg-[#181818] px-4 py-2 text-sm rounded-full hover:bg-[#222222] transition-colors"
            >
              New Analysis
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto px-4 py-6">
        {/* League Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {footballLeagues.map((league) => (
            <motion.button
              key={league}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLeague(league)}
              className={`px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm rounded-full ${
                selectedLeague === league
                  ? "bg-green-500 text-black font-bold"
                  : "bg-[#181818] hover:bg-[#262626] text-gray-300"
              }`}
            >
              {league}
            </motion.button>
          ))}
        </div>

        {/* Betting Platforms */}
        {messages.length === 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-center">Recommended Betting Platforms</h2>
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
                  {msg.type === "responseMsg" && (
                    <FaFutbol className="text-green-500" />
                  )}
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
              placeholder="Enter match (e.g., 'Manchester City vs Arsenal - 2024-03-15')"
              className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handlePredictionRequest()}
              disabled={isLoading}
            />
            <button 
              onClick={handlePredictionRequest}
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
          
          <p className="text-gray-500 text-xs md:text-sm mt-4 text-center">
            Example queries: "Predict Chelsea vs Liverpool with odds", 
            "Analyze Barcelona's next match considering injuries",
            "PSG vs Marseille tactical breakdown"
          </p>
        </div>
      </main>
    </div>
  );
};

export default PredictionPage;