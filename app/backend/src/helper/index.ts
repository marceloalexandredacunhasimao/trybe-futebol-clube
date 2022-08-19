import { Jwt, sign, SignOptions, verify } from 'jsonwebtoken';
import { ITokenData } from '../interfaces';

const secret = process.env.JWT_SECRET || 'jwt_secret';

function makeToken(data: ITokenData) {
  const config: SignOptions = {
    expiresIn: '365d',
    algorithm: 'HS256',
  };
  return sign({ data }, secret, config);
}

function validateLogin(email: string | undefined, password: string | undefined):
{ status: number, message: string } {
  if (!email || !password) {
    return { status: 400, message: 'All fields must be filled' };
  }
  return { status: 0, message: '' };
}

function getTokenData(auth: string | undefined):
{ status: number, message: string, data: Jwt | null } {
  if (!auth) return { status: 401, message: 'Invalid token', data: null };
  let token = auth;
  if (token.includes('Bearer')) [, token] = auth.split(' ');
  try {
    const data = verify(token, secret, { complete: true }) as Jwt;
    return { status: 0, message: '', data };
  } catch (err) {
    return { status: 401, message: 'Invalid token', data: null };
  }
}

export {
  makeToken,
  validateLogin,
  getTokenData,
};
