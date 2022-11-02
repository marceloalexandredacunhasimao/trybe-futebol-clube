import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';
import { validateLogin, makeToken, getTokenData, HttpError } from '../helper';

class UserService {
  static async login(email: string, password: string): Promise<string> {
    validateLogin(email, password);
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      throw new HttpError('Incorrect email or password', 401);
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw new HttpError('Incorrect email or password', 401);
    }
    const token = makeToken(user);
    return token;
  }

  static async validate(auth: string | undefined): Promise<string> {
    const data = getTokenData(auth);
    const { email } = data.payload.data;
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) throw new HttpError('Token must be a valid token', 401);
    return user.role;
  }
}

export default UserService;
