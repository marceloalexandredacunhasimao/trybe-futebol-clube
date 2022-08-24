// import * as bcrypt from 'bcryptjs';
// import User from '../database/models/User.model';
import Team from '../database/models/Team.model';
// import { validateLogin, makeToken, getTokenData } from '../helper';

class TeamService {
  static async findAll(): Promise<Team[]> {
    return Team.findAll();
  }

  static async findById(id: string): Promise<Team | null> {
    return Team.findByPk(id);
  }
}

export default TeamService;
