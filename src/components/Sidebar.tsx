import React from "react";

interface SidebarProps {
  selectedLeague: string | null;
  onSelectLeague: (leagueName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedLeague, onSelectLeague }) => {
  const leagues = [
    { name: "Premier League", icon: "/premier-league.png" },
    { name: "Primera Division", icon: "/primera-division.png" },
    { name: "Bundesliga", icon: "/bundesliga.png" },
    { name: "Serie A", icon: "/serie-a.png" },
    { name: "Championship", icon: "/champions.png" },
    { name: "Brazilian Championship Series A", icon: "/brazilian-league.png" },
    { name: "Primeira Ligaa", icon: "/Primeira-Liga.png" },
    { name: "Copa Libertadores", icon: "/Copa-Libertadores.png" },
  ];

  return (
    <div className="w-64 bg-[#2C2F38] p-4">
      <h1 className="text-xl font-bold mb-4">Football info</h1>
      <h2 className="text-green-400 text-sm mb-2">Leagues</h2>
      <ul className="space-y-4">
        {leagues.map((league) => (
          <li
            key={league.name}
            className={`flex items-center gap-2 text-sm cursor-pointer transition-colors duration-200 ${
              selectedLeague === league.name ? "text-green-400 font-semibold" : "text-white hover:text-green-300"
            }`}
            onClick={() => onSelectLeague(league.name)}
          >
            <img src={league.icon} alt={league.name} className="w-5 h-5" />
            {league.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
