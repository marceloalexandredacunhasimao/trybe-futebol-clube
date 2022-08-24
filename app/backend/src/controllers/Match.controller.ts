import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

class MatchController {
  static async findAll(_req: Request, res: Response): Promise<void> {
    const matchs = await MatchService.findAll();
    res.status(200).json(matchs);
  }

  static async findByProgressStatus(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matchs = await MatchService.findAll();
      res.status(200).json(matchs);
      return;
    }
    const matchs = await MatchService.findByProgressStatus(inProgress === 'true');
    res.status(200).json(matchs);
  }

  static async create(req: Request, res: Response): Promise<void> {
    // const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, message, match } = await MatchService.create(req.body);
    //      .create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    if (message !== '') {
      res.status(status).json({ message });
    } else {
      res.status(201).json(match);
    }
  }

  static async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    MatchService.finish(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    MatchService.update(Number(id), req.body);
    res.status(200).json({ message: 'Updated' });
  }
}

export default MatchController;
