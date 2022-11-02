import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/Match.service';

class MatchController {
  static async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const matchs = await MatchService.findAll();
      res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  }

  static async findByProgressStatus(req: Request, res: Response, next: NextFunction):
  Promise<void> {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const matchs = await MatchService.findAll();
        res.status(200).json(matchs);
        return;
      }
      const matchs = await MatchService.findByProgressStatus(inProgress === 'true');
      res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await MatchService.create(req.body);
      res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }

  static async finish(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      MatchService.finish(Number(id));
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      MatchService.update(Number(id), req.body);
      res.status(200).json({ message: 'Updated' });
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
