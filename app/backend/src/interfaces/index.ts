import Team from '../database/models/Team.model';

interface IDetailedMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: Team | null;
  teamAway: Team | null;
}

interface ITokenData {
  email: string;
  username: string;
  role: string;
  id: number;
}

interface IMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export {
  IDetailedMatch,
  ITokenData,
  IMatch,
};
