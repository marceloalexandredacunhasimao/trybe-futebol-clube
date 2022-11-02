import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helper';

function errorMiddleware(
  error: HttpError | Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof HttpError) {
    const { message, httpStatus } = error;
    res.status(httpStatus).json({ message });
  } else {
    res.status(500).json({ message: `Internal error: ${error.message}` });
  }
}

export default errorMiddleware;
