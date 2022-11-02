import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import { IDetailedMatch, IGoals, IMatch } from '../interfaces';
import { HttpError } from '../helper';

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

  static async checkNewMatch(homeTeam: number, awayTeam: number) {
    if (homeTeam === awayTeam) {
      throw new HttpError('It is not possible to create a match with two equal teams', 401);
    }
    if (
      !await Team.findOne({ where: { id: homeTeam } })
      || !await Team.findOne({ where: { id: awayTeam } })
    ) {
      throw new HttpError('There is no team with such id!', 404);
    }
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

  static async create(newMatch: IMatch): Promise<Match> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
    await MatchService.checkNewMatch(homeTeam, awayTeam);
    const match = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return match;
  }

  static async finish(id: number): Promise<void> {
    await Match.upsert({ id, inProgress: false });
  }

  static async update(id: number, goals: IGoals): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = goals;
    await Match.upsert({ id, homeTeamGoals, awayTeamGoals });
  }
}

export default MatchService;
