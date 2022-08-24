// import * as bcrypt from 'bcryptjs';
// import User from '../database/models/User.model';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
// import { IDetailedMatch, IGoals, IMatch, IGameResult, ITeamResults } from '../interfaces';
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

  /*
  static async detailedMatch(match: Match): Promise<IDetailedMatch> {
    const teamHome = await Team.findOne(
      { where: { id: match.homeTeam }, attributes: ['teamName'], raw: true },
    );
    const teamAway = await Team.findOne(
      { where: { id: match.awayTeam }, attributes: ['teamName'], raw: true },
    );
    return {
      ...match,
      teamHome,
      teamAway,
    };
  }

  static async checkNewMatch(homeTeam: number, awayTeam: number):
  Promise<{ status: number, message: string }> {
    if (homeTeam === awayTeam) {
      return {
        status: 401,
        message: 'It is not possible to create a match with two equal teams',
      };
    }
    if (
      !await Team.findOne({ where: { id: homeTeam } })
      || !await Team.findOne({ where: { id: awayTeam } })
    ) {
      return {
        status: 404,
        message: 'There is no team with such id!',
      };
    }
    return { status: 0, message: '' };
  }
*/
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
/*
  static async findByProgressStatus(inProgress: boolean): Promise<IDetailedMatch[]> {
    const matches = await Match.findAll({ where: { inProgress }, raw: true });
    const promises = matches.map(async (match) => LeaderboardService.detailedMatch(match));
    return Promise.all(promises);
  }

  static async create(newMatch: IMatch):
  Promise<{ status: number, message: string, match: Match | null }> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
    const { status, message } = await LeaderboardService.checkNewMatch(homeTeam, awayTeam);
    if (message !== '') return { status, message, match: null };
    const match = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return { status: 0, message: '', match };
  }

  static async finish(id: number): Promise<void> {
    await Match.upsert({ id, inProgress: false }); // update({ inProgress: false }, { where: { id } });
  }

  static async update(id: number, goals: IGoals): Promise<void>
  {
    const { homeTeamGoals, awayTeamGoals } = goals;
    await Match.upsert({ id, homeTeamGoals, awayTeamGoals });
  }
*/
}
export default LeaderboardService;
