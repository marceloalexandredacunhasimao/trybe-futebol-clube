// import * as bcrypt from 'bcryptjs';
// import User from '../database/models/User.model';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import { IDetailedMatch, IGoals, IMatch } from '../interfaces';

class MatchService {
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

  static async findAll(): Promise<IDetailedMatch[]> {
    const matches = await Match.findAll({ raw: true });
    const promises = matches.map(async (match) => MatchService.detailedMatch(match));
    return Promise.all(promises);
  }

  static async findByProgressStatus(inProgress: boolean): Promise<IDetailedMatch[]> {
    const matches = await Match.findAll({ where: { inProgress }, raw: true });
    const promises = matches.map(async (match) => MatchService.detailedMatch(match));
    return Promise.all(promises);
  }

  static async create(newMatch: IMatch):
  Promise<{ status: number, message: string, match: Match | null }> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
    const { status, message } = await MatchService.checkNewMatch(homeTeam, awayTeam);
    if (message !== '') return { status, message, match: null };
    const match = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return { status: 0, message: '', match };
  }

  static async finish(id: number): Promise<void> {
    await Match.upsert({ id, inProgress: false }); // update({ inProgress: false }, { where: { id } });
  }

  static async update(id: number, goals: IGoals): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = goals;
    await Match.upsert({ id, homeTeamGoals, awayTeamGoals });
  }
}

export default MatchService;
