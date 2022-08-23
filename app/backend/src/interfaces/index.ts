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

interface IGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

interface IMatch extends IGoals {
  homeTeam: number;
  awayTeam: number;
}

interface IGameResult {
  totalPoints: number;
  goalsFavor: number;
  goalsOwn: number;
}

interface ITeamResults {
  name: string;
  totalGames: number;
  totalPoints: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export {
  IDetailedMatch,
  ITokenData,
  IGoals,
  IMatch,
  IGameResult,
  ITeamResults,
};
