import Team from '../database/models/Team.model';

class TeamService {
  static async findAll(): Promise<Team[]> {
    return Team.findAll();
  }

  static async findById(id: string): Promise<Team | null> {
    return Team.findByPk(id);
  }
}

export default TeamService;
