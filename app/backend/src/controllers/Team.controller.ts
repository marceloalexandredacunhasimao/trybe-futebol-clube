import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

class TeamController {

  static async findAll(_req: Request, res: Response): Promise<void> {
    const teams = await TeamService.findAll();
    res.status(200).json(teams);
  }

  static async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await TeamService.findById(id);
    res.status(200).json(team);
  }

}

export default TeamController;
