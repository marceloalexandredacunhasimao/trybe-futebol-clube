import { Request, Response, NextFunction } from 'express';
import UserService from '../services/User.service';

class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = req.headers.authorization;
      const role = await UserService.validate(auth);
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
