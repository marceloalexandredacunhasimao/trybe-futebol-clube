import { Jwt, sign, SignOptions, verify } from 'jsonwebtoken';
import { ITokenData } from '../interfaces';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class HttpError extends Error {
  public httpStatus: number;
  constructor(message: string, httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
  }
}

function makeToken(data: ITokenData) {
  const config: SignOptions = {
    expiresIn: '365d',
    algorithm: 'HS256',
  };
  return sign({ data }, secret, config);
}

function validateLogin(email: string | undefined, password: string | undefined):
void {
  if (!email || !password) {
    throw new HttpError('All fields must be filled', 400);
  }
}

function getTokenData(auth: string | undefined): Jwt {
  if (!auth) throw new HttpError('Token must be a valid token', 401);
  let token = auth;
  if (token.includes('Bearer')) [, token] = auth.split(' ');
  try {
    const data = verify(token, secret, { complete: true }) as Jwt;
    return data;
  } catch (err) {
    throw new HttpError('Token must be a valid token', 401);
  }
}

export {
  makeToken,
  validateLogin,
  getTokenData,
  HttpError,
};
