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
/*
  static async findByProgressStatus(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matchs = await LeaderboardService.findAll();
      res.status(200).json(matchs);
      return;
    }
    const matchs = await LeaderboardService.findByProgressStatus(inProgress === 'true');
    res.status(200).json(matchs);
  }

  static async create(req: Request, res: Response): Promise<void> {
    // const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, message, match } = await LeaderboardService.create(req.body);
    //      .create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    if (message !== '') {
      res.status(status).json({ message });
    } else {
      res.status(201).json(match);
    }
  }

  static async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    LeaderboardService.finish(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    LeaderboardService.update(Number(id), req.body);
    res.status(200).json({ message: 'Updated' });
  } */
}

export default LeaderboardController;
