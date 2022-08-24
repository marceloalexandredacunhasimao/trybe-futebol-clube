import { Request, Response, NextFunction } from 'express';
import UserService from '../services/User.service';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  const { status, message } = await UserService.validate(auth);
  if (message !== '') {
    res.status(status).json({ message });
  } else {
    next();
  }
}

export default authMiddleware;
