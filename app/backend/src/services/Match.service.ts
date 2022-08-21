// import * as bcrypt from 'bcryptjs';
// import User from '../database/models/User.model';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import { IDetailedMatch } from '../interfaces';

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
  /*
  static async findById(id: string): Promise<Match | null> {
    return Match.findByPk(id);
  } */
/*
  static async login(email: string, password: string):
  Promise<{ status: number, message: string, token: string }> {
    const { status, message } = validateLogin(email, password);
    if (message !== '') {
      return { status, message, token: '' };
    }
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return { status: 401, message: 'Incorrect email or password', token: '' };
    }
    if (!await bcrypt.compare(password, user.password)) {
      return { status: 401, message: 'Incorrect email or password', token: '' };
    }
    const token = makeToken(user); // makeToken({ email, username, role, id });
    return { status: 200, message: '', token };
  }

  static async validate(auth: string | undefined):
  Promise<{ status: number, message: string, role: string }> {
    const { status, message, data } = getTokenData(auth);
    if (!data) return { status, message, role: '' };
    const { email } = data.payload.data;
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) return { status: 401, message: 'Invalid token', role: '' };
    return { status: 200, message: '', role: user.role };
  }
*/
}

export default MatchService;
