// src/api.ts
import axios from "axios";

const API_KEY = "10432d19b1854b2d8385a48556e8b5cd";
const API_HOST = "api-football-v1.p.rapidapi.com";

interface Match {
  fixture: {
    date: string;
  };
  league: {
    name: string;
  };
  teams: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
}

export const fetchMatchesByLeague = async (leagueId: number) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const response = await axios.get(
      `https://${API_HOST}/v3/fixtures?league=${leagueId}&season=2024&date=${today}`,
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }
    );

    const data = response.data.response;

    return data.map((match: { fixture: { date: string }; league: { name: string }; teams: { home: { name: string; logo: string }; away: { name: string; logo: string } } }): Match => ({
      fixture: {
        date: match.fixture.date,
      },
      league: {
        name: match.league.name,
      },
      teams: {
        home: {
          name: match.teams.home.name,
          logo: match.teams.home.logo,
        },
        away: {
          name: match.teams.away.name,
          logo: match.teams.away.logo,
        },
      },
    }));
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    return [];
  }
};
