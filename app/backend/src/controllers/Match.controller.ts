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
/*
  static async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await MatchService.findById(id);
    res.status(200).json(team);
  }
*/
}

export default MatchController;
