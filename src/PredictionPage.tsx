import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaFutbol, FaUsers, FaTrophy, FaChartBar } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
  const [messages, setMessages] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(footballLeagues[0]);

  const hitRequest = () => {
    if (message) {
      generateResponse(`${selectedLeague}: ${message}`);
    } else {
      alert("You must write something!");
    }
  };

  const generateResponse = async (userMsg) => {
    if (!userMsg) return;

    try {
      const genAI = new GoogleGenerativeAI("API_KEY");
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
                className={`bg-[#181818] text-white p-4 rounded-[30px] my-2 max-w-[60vw] min-w-[20vw] ${
                  msg.type === "userMsg" ? "self-end" : "self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl mb-6">Predict With NFE</h1>
          <div className="flex gap-4">
            {[
              {
                icon: <FaFutbol />,
                text: "Know about matches?.",
              },
              {
                icon: <FaChartBar />,
                text: "Wants statistics of games?",
              },
              {
                icon: <FaUsers />,
                text: "Who is the best player in Barcelona?",
              },
              {
                icon: <FaTrophy />,
                text: "Which club has the highest EUROPHA Trophies?",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#181818] p-4 min-h-[20vh] w-[200px] rounded-lg relative hover:bg-[#201f1f] transition-all cursor-pointer"
              >
                <p className="text-lg whitespace-pre-wrap">{item.text}</p>
                <span className="absolute bottom-3 right-3 text-xl">
                  {item.icon}
                </span>
              </div>
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
