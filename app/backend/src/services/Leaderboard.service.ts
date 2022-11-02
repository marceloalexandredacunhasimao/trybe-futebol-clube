import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import { IGameResult, ITeamResults } from '../interfaces';

class LeaderboardService {
  protected static initialTeamResult = {
    name: '',
    totalGames: 0,
    totalPoints: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  static calcPointes(team: Team, match: Match): IGameResult {
    const { id } = team;
    const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
    let totalPoints = 0;
    let goalsFavor = homeTeamGoals;
    let goalsOwn = awayTeamGoals;
    if (awayTeam === id) {
      goalsFavor = awayTeamGoals;
      goalsOwn = homeTeamGoals;
    }
    if (goalsFavor > goalsOwn) {
      totalPoints = 3;
    } else if (goalsFavor === goalsOwn) {
      totalPoints = 1;
    }
    return { totalPoints, goalsFavor, goalsOwn };
  }

  static async findMatchByTeamId(homeAway: string, team: Team): Promise<Match[]> {
    const { id } = team;
    let matches: Match[] = [];
    if (homeAway !== 'away') {
      const home = await Match.findAll({
        where: { inProgress: false, homeTeam: id }, raw: true,
      });
      matches = home;
    }
    if (homeAway !== 'home') {
      const away = await Match.findAll({
        where: { inProgress: false, awayTeam: id }, raw: true,
      });
      matches = [...matches, ...away];
    }
    return matches;
  }

  static async teamResult(homeAway: string, team: Team): Promise<ITeamResults | null> {
    const matches = await LeaderboardService.findMatchByTeamId(homeAway, team);
    if (!matches) return null;
    const result = { ...LeaderboardService.initialTeamResult };
    matches.forEach((match) => {
      const { totalPoints, goalsFavor, goalsOwn } = LeaderboardService.calcPointes(team, match);
      result.totalGames += 1;
      result.totalPoints += totalPoints;
      result.totalVictories += totalPoints === 3 ? 1 : 0;
      result.totalDraws += totalPoints === 1 ? 1 : 0;
      result.totalLosses += totalPoints === 0 ? 1 : 0;
      result.goalsFavor += goalsFavor;
      result.goalsOwn += goalsOwn;
    });
    result.name = team.teamName;
    result.goalsBalance = result.goalsFavor - result.goalsOwn;
    result.efficiency = (result.totalPoints / (result.totalGames * 3)) * 100;
    result.efficiency = Number(result.efficiency.toFixed(2));
    return result;
  }

  static sortResults(results: ITeamResults[]): ITeamResults[] {
    return results.sort((res1: ITeamResults, res2: ITeamResults): number => {
      if (res1.totalPoints !== res2.totalPoints) return res2.totalPoints - res1.totalPoints;
      if (res1.totalVictories !== res2.totalVictories) {
        return res2.totalVictories - res1.totalVictories;
      }
      if (res1.goalsBalance !== res2.goalsBalance) return res2.goalsBalance - res1.goalsBalance;
      if (res1.goalsFavor !== res2.goalsFavor) return res2.goalsFavor - res1.goalsFavor;
      return res2.goalsOwn - res1.goalsOwn;
    });
  }

  static async findAll(homeAway: string): Promise<ITeamResults[]> {
    let ratings: (null | ITeamResults)[] = [];
    const teams = await Team.findAll();
    const promises = teams.map((team) => LeaderboardService.teamResult(homeAway, team));
    ratings = await Promise.all(promises);
    ratings = ratings.filter((rating) => rating != null);
    return LeaderboardService.sortResults(ratings as ITeamResults[]);
  }
}
export default LeaderboardService;
