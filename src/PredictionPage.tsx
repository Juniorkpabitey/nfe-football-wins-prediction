// Removed unused React import
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaFutbol } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure this package is installed
import { motion } from "framer-motion";

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

// System Prompt - guides AI behavior
const SYSTEM_PROMPT = `You are a football prediction assistant AI. You analyze past statistics, club formations, and league information to help users make educated predictions about football matches. Respond with accurate, brief, and insightful information. Always ensure your data reflects recent football trends and player/team performances.`;

const PredictionPage = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState<{ type: string; text: string }[]>([]);
  const [selectedLeague, setSelectedLeague] = useState(footballLeagues[0]);

  const hitRequest = () => {
    if (message) {
      generateResponse(`${selectedLeague}: ${message}`);
    } else {
      alert("You must write something!");
    }
  };

  const generateResponse = async (userMsg: string) => {
    if (!userMsg) return;

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyAnyjf8Oc1WXwWrJHidVhcvWinWkQ28tpE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chat = model.startChat({
        history: [
          {
            role: "system",
            parts: [{ text: SYSTEM_PROMPT }],
          },
        ],
      });

      const result = await chat.sendMessage(userMsg);

      const newMessages = [
        ...messages,
        { type: "userMsg", text: userMsg },
        { type: "responseMsg", text: result.response.text() },
      ];

      setMessages(newMessages);
      setIsResponseScreen(true);
      setMessage("");
    } catch (error) {
      alert("Failed to generate prediction. Please check your API key or try again later.");
      console.error("Prediction error:", error);
    }
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
  };

  return (
    <div className="w-screen min-h-screen bg-[#0E0E0E] text-white overflow-x-hidden">
      {isResponseScreen ? (
        <div className="h-[80vh]">
          <div className="flex items-center justify-between px-[300px] pt-6">
            <h2 className="text-2xl">Predict With NFE</h2>
            <button
              onClick={newChat}
              className="bg-[#181818] px-5 py-2 text-sm rounded-full"
            >
              New Chat
            </button>
          </div>

          <div className="flex flex-col pt-8 px-[300px]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`bg-[#181818] text-white p-4 rounded-[30px] my-2 max-w-[60vw] min-w-[20vw] ${msg.type === "userMsg" ? "self-end" : "self-start"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-6">
            <FaFutbol className="text-5xl text-green-500 mb-2" />
            <h1 className="text-4xl font-bold">Predict With NFE</h1>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
              {[
                { name: "ilobet", icon: <FaFutbol />, url: "https://www.ilobet.com" },
                { name: "BangBet", icon: <FaFutbol />, url: "https://www.bangbet.com" },
                { name: "1xBet", icon: <FaFutbol />, url: "https://1xbet.com" },
                { name: "Betway", icon: <FaFutbol />, url: "https://www.betway.com" },
                { name: "Bet365", icon: <FaFutbol />, url: "https://www.bet365.com" },
              ].map((platform, i) => (
                <motion.a
                  key={i}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="bg-[#181818] p-3 w-[150px] h-[120px] rounded-xl hover:shadow-lg hover:bg-[#222222] transition-all cursor-pointer flex flex-col justify-between no-underline text-white"
                >
                  <p className="text-md font-semibold">{platform.name}</p>
                  <span className="self-end text-xl text-green-500">{platform.icon}</span>
                </motion.a>
              ))}

          </div>
        </div>
      )}

      {/* Tabs for Football Leagues */}
      <div className="w-full mt-4 flex justify-center flex-wrap gap-4 px-4">
        {footballLeagues.map((league) => (
          <button
            key={league}
            onClick={() => setSelectedLeague(league)}
            className={`px-4 py-2 text-sm rounded-full ${
              selectedLeague === league
                ? "bg-green-500 text-black"
                : "bg-[#181818] hover:bg-[#262626] text-white"
            }`}
          >
            {league}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex flex-col items-center mt-6 w-full">
        <div className="w-[60%] bg-[#181818] flex items-center py-2 px-4 rounded-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Write your message here..."
            className="bg-transparent flex-1 outline-none text-white"
          />
          {message && (
            <IoSend
              className="text-green-500 text-xl cursor-pointer ml-2"
              onClick={hitRequest}
            />
          )}
        </div>
        <p className="text-gray-500 text-sm mt-4 text-center">
          This AI bot uses models in predicting wins for games from past statistics and club formations.
        </p>
      </div>
    </div>
  );
};

export default PredictionPage;
