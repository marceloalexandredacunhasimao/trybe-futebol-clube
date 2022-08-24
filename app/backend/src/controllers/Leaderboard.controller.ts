import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

class LeaderboardController {
  static async findAllHome(_req: Request, res: Response): Promise<void> {
    const leaderboards = await LeaderboardService.findAll('home');
    res.status(200).json(leaderboards);
  }

  static async findAllAway(_req: Request, res: Response): Promise<void> {
    const leaderboards = await LeaderboardService.findAll('away');
    res.status(200).json(leaderboards);
  }

  static async findAll(_req: Request, res: Response): Promise<void> {
    const leaderboards = await LeaderboardService.findAll('any');
    res.status(200).json(leaderboards);
  }

}

export default LeaderboardController;
