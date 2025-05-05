import { apiOptions, matchesType } from "@/types";
const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": import.meta.env.API_TOKEN,
    "Content-Type": "application/json",
  },
};

export const getMatchesfootball = async () => {
  const response = await fetch('https://api.football-data.org/v4/matches', options);
  return response.json();
};

export const filterLeague = async (filterData: string): Promise<matchesType[]> => {
  const allMatches = await getMatchesfootball();
  return allMatches.matches.filter((match: matchesType) => match.competition.name === filterData);
};
