import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';
import { validateLogin, makeToken, getTokenData } from '../helper';
// import { Jwt, sign, SignOptions, verify } from 'jsonwebtoken';

// const secret = process.env.JWT_SECRET || 'jwt_secret';

// const tokenMsg = 'Token must be a valid token';

class UserService {
  static async login(email: string, password: string):
  Promise<{ status: number, message: string, token: string }> {
    const { status, message } = validateLogin(email, password);
    if (message !== '') {
      return { status, message, token: '' };
    }
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return { status: 401, message: 'Incorrect email or password', token: '' };
    }
    if (!await bcrypt.compare(password, user.password)) {
      return { status: 401, message: 'Incorrect email or password', token: '' };
    }
    const token = makeToken(user); // makeToken({ email, username, role, id });
    return { status: 200, message: '', token };
  }

  static async validate(auth: string | undefined):
  Promise<{ status: number, message: string, role: string }> {
    const { status, message, data } = getTokenData(auth);
    if (!data) return { status, message, role: '' };
    const { email } = data.payload.data;
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) return { status: 401, message: 'Invalid token', role: '' };
    return { status: 200, message: '', role: user.role };
  }
/*
    const { email: em, password } = req.body;
    if (!password || !em) {
      throw new ErrorCode('All fields must be filled', 400);
    }
    const user = await UserService.getOne(em);
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      throw new ErrorCode('Incorrect email or password', 401);
    }
    const { email, username, role, id } = user;
    const token = UserController.createToken({ email, username, role, id });
    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const auth = req.headers.authorization;
    if (!auth) { throw new ErrorCode(tokenMsg, 401); }
    const token = auth.includes('Bearer') ? auth.split(' ')[1] : auth;
    let data: Jwt;
    try { data = verify(token, secret, { complete: true }) as Jwt; } catch (e) {
      throw new ErrorCode(tokenMsg, 401);
    }
    const info = data.payload.data.email;
    const exists = await UserService.getOne(info);
    if (!exists) { throw new ErrorCode(tokenMsg, 401); }
    const { password, ...user } = exists;
    res.status(200).json({ role: user.role });
  }
*/
}

export default UserService;
