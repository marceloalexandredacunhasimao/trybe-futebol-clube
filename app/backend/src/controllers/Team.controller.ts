import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

class TeamController {
  static async findAll(_req: Request, res: Response): Promise<void> {
    //    const { status, message, token } = await TeamService.getAll();
    const teams = await TeamService.findAll();
    res.status(200).json(teams);
    /* if (message !== '') {
      res.status(status).json({ message });
    } else {
      res.status(status).json({ token });
    } */
  }

  static async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await TeamService.findById(id);
    res.status(200).json(team);
  }

/*  static async validate(req: Request, res: Response) {
    const auth = req.headers.authorization;
    const { status, message, role } = await TeamService.validate(auth);
    if (message !== '') {
      res.status(status).json({ message });
    } else {
      res.status(status).json({ role });
    }
  } */
}

export default TeamController;
