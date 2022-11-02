import { Request, Response, NextFunction } from 'express';
import UserService from '../services/User.service';
import { HttpError } from '../helper';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  try {
    await UserService.validate(auth);
    next();
  } catch (err) {
    const error = err as HttpError;
    res.status(error.httpStatus).json({ message: error.message });
  }
}

export default authMiddleware;
