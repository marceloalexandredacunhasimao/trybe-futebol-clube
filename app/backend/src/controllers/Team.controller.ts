import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/Team.service';

class TeamController {
  static async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await TeamService.findAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const team = await TeamService.findById(id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamController;
