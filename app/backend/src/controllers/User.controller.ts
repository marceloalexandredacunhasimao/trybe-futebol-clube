import { Request, Response } from 'express';
import UserService from '../services/User.service';

class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { status, message, token } = await UserService.login(email, password);
    if (message !== '') {
      res.status(status).json({ message });
    } else {
      res.status(status).json({ token });
    }
  }

  static async validate(req: Request, res: Response) {
    const auth = req.headers.authorization;
    const { status, message, role } = await UserService.validate(auth);
    if (message !== '') {
      res.status(status).json({ message });
    } else {
      res.status(status).json({ role });
    }
  }
}

export default UserController;
