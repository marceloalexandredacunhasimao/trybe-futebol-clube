import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

class LeaderboardController {
  static async findAllHome(_req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const leaderboards = await LeaderboardService.findAll('home');
      res.status(200).json(leaderboards);
    } catch (error) {
      next(error);
    }
  }

  static async findAllAway(_req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const leaderboards = await LeaderboardService.findAll('away');
      res.status(200).json(leaderboards);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(_req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const leaderboards = await LeaderboardService.findAll('any');
      res.status(200).json(leaderboards);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
